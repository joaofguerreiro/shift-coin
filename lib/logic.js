'use strict';

/**
 * Basic coin transaction
 * @param {org.shiftfaro.CoinTransaction} tx
 * @transaction
 */
function coinTransaction(tx) {
    
  	if (tx.coin.owner == tx.newOwner) {
      	// Raise an error if the coin was sent to its current owner
    	throw "C'mon - why would you give someone what is already theirs?!";
    }

  	// Update the coin with the new owner
  	tx.coin.owner = tx.newOwner;    
    
    // Get the asset registry for ShiftCoin
    return getAssetRegistry('org.shiftfaro.ShiftCoin')
        .then(function(assetRegistry) {

            // Update the coin in the asset registry
            return assetRegistry.update(tx.coin);
        })
        .then(function() {

            // Emit an event for the transactioned coin
            var event = getFactory().newEvent('org.shiftfaro', 'TransactionEvent');
            event.coin = tx.coin;
            event.newOwner = tx.newOwner;
            emit(event);
        });
}

