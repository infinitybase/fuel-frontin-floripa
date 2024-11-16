predicate;

use std::{outputs::{output_asset_to}};

configurable {
    RECEIVER: Address = Address::from(0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db),
}

fn main() -> bool {
     let to = match output_asset_to(0) {
        Some(address) => address,
        None => return false,
    };

    (to == RECEIVER)
}
