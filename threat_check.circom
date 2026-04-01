pragma circom 2.0.0;

include "node_modules/circomlib/circuits/comparators.circom";

template ThreatDetector() {
    // Signals
    signal input rule_id;      // Private: The actual log ID
    signal input threshold;    // Public: The level we consider a threat
    signal output is_threat;   // Public: 1 if threat, 0 if not

    // Use a comparator to check if rule_id > threshold
    component gt = GreaterThan(32); 
    gt.in[0] <== rule_id;
    gt.in[1] <== threshold;

    is_threat <== gt.out;
}

component main {public [threshold]} = ThreatDetector();
