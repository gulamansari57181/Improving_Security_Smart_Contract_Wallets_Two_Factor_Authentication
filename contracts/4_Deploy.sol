// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;

contract testDeploy {
    bytes32 pprev;
    uint32 id;
    uint256 k;
    uint256 tinit;
    uint256 tprev;
    bytes32 pverify;
    uint256 tmax;
    bytes32 commitment;
    event ValuesStored(bool success);
    event Authenticated(bool success);
    event CommitStored(bool success);


    function storeValues(uint256 _tinit, uint256 _k, uint32 _id, bytes32 rootHash) public returns (bool) {
        pprev = rootHash;
        tinit = _tinit;
        tprev = tinit;
        k = _k;
        id = _id;
        tmax = tinit + k;
        emit ValuesStored(true);
        return true;
    }
    function storeCommitment(bytes32 _commitment) public returns (bool) {
        commitment=_commitment;
        emit CommitStored(true);
        return true;
    }



    function generateHashFunction(uint256 i, bytes32 x) internal view returns (bytes32) {
        uint256 y = tinit + k - i;
        bytes32 root = sha256(abi.encodePacked(y, id, x));
        return root;
    }

    function authenticate(uint256 t, bytes32 hashedOTP) public returns (bool) {
        bool success = false;
        bytes32 temp = sha256(abi.encodePacked(hashedOTP));
        if (temp != commitment) {
            emit Authenticated(false);
            return false;
        }
        if (!(t > 0 && t >= tprev && t <= tmax)) {
            emit Authenticated(false);
            return false;
        }
        pverify = hashedOTP;
        for (uint256 i = tmax - t + 1; i <= tmax - tprev; i++) {
            pverify = generateHashFunction(i, pverify);
            if (pprev == pverify) {
                pprev = hashedOTP;
                tprev = t;
                success = true;
            }
        }
        emit Authenticated(success);
        return success;
    }
}