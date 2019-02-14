import newCustomerReducer from './newCustomerReducer';

describe('testing newCustomerReducer', ()=>{
    test('set the reducer to have first_name of Jack', ()=>{
        // in a type and payload of change
        let action = { type: 'SET_NEW_CUSTOMER', payload: { first_name: 'Jack'} }
        expect(newCustomerReducer( action )).toBe({first_name: 'Jack'})
    })
})