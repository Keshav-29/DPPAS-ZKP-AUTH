pragma circom 2.1.9;

template Identity() {
    // Private input
    signal private input secret;
    // Public output
    signal output hash;

    // Simple hash = secret * 7 + 3 (for demonstration)
    hash <== secret * 7 + 3;
}

component main = Identity();
