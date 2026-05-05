pragma circom 2.1.9;

include "circuits/poseidon.circom";

template Login() {
    // Private inputs (implicitly private)
    signal input secret;
    signal input nonce;

    // Public inputs
    signal input publicHash;
    signal input publicNonce;

    // Output
    signal output valid;

    // Poseidon hash of secret + nonce
    component poseidon = Poseidon(2);
    poseidon.inputs[0] <== secret;
    poseidon.inputs[1] <== nonce;
    
    //Equality checks
    signal isHashEqual;
    signal isNonceEqual;

    isHashEqual <== 1 - (poseidon.out - publicHash) * (poseidon.out - publicHash);
    isNonceEqual <== 1 - (nonce - publicNonce) * (nonce - publicNonce);

    // Both must be equal → logical AND
    valid <== isHashEqual * isNonceEqual;

    
}

component main = Login();
