export function AbsBuybackViewModel() {
    overrides = {
        update: function() {
            
        }
    };
    return Object.create(BuybackResultViewModel(), overrides);
}