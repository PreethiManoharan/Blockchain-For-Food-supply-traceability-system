pragma solidity ^0.4.18;

contract Verifier{
    
    enum roles {Producer, Distributor, Retailer, none}
    uint count;
    
    struct entityDetail
    {
        bytes32 name;
        bytes32 email;
        bytes32 password;
        bytes32 warehouse;
        bytes32 entity_type;
        bytes32 entity_info;
        address public_address;
        roles roles_assigned;
        uint amount_assigned;
    }
    
    mapping(address => entityDetail) entityDB;
    uint[] count_info;
    address[] addr_info;
    roles[] roles_assigned_info;
    bytes32[] name_info;
    bytes32[] entity_types;
    
    address public chair_person;
  
    
    event LogEntityInfoSet(string printInfo, bytes32 Name, bytes32 Email, 
    bytes32 Warehouse, bytes32 Entity_type, bytes32 Entity_info, roles Role, 
    uint amount);
    
    event LogRoleSet(uint Count,address Address, bytes32 Name, roles Role, string sent);
    
    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }
    
    constructor() public {
        chair_person = msg.sender;
        count = 0;
        entityDB[chair_person].amount_assigned = 1000;
    }
    
    function setEntityInfo(bytes32 _name, bytes32 _email, bytes32 _password, 
    bytes32 _warehouse, bytes32 _entity_type, bytes32 _entity_info) public returns
    (bool)
    {
        entityDB[msg.sender].name = _name;
        entityDB[msg.sender].email = _email;
        entityDB[msg.sender].password = _password;
        entityDB[msg.sender].warehouse = _warehouse;
        entityDB[msg.sender].entity_type = _entity_type;
        entityDB[msg.sender].entity_info = _entity_info;
        entityDB[msg.sender].public_address = msg.sender;
        entityDB[msg.sender].roles_assigned = roles.none;
        entityDB[msg.sender].amount_assigned = 0;
        
        count_info.push(count);
        addr_info.push(msg.sender) ;
        roles_assigned_info.push(roles.none);
        name_info.push(_name);
        entity_types.push(_entity_type);
        
        
        count ++;
        
        emit LogEntityInfoSet("Entered Details", _name, _email, _warehouse, 
        _entity_type, _entity_info, roles.none, 0);
        
        return true;
    }
    
    function getEntityInfo() public constant returns(uint[],address[],roles[],bytes32[],bytes32[])
    {
        return(count_info,addr_info,roles_assigned_info,name_info,entity_types);
    }
    
    
    function login(bytes32 _email, bytes32 _password) 
    public constant returns(uint) {
        require ((entityDB[msg.sender].email == _email) &&
        (entityDB[msg.sender].password == _password));
        
        return entityDB[msg.sender].roles_assigned;
    }
    
    function setRole(uint _count,address _addr, roles _role, uint _amt)
     public returns(bool)
    {   
        
        assert(entityDB[chair_person].amount_assigned >= _amt);
        
        entityDB[_addr].roles_assigned = _role;
        entityDB[_addr].amount_assigned += _amt;
        entityDB[chair_person].amount_assigned -= _amt;
    
        roles_assigned_info[_count] = _role;
        
        emit LogRoleSet(_count, _addr, entityDB[_addr].name, entityDB[_addr].roles_assigned, "verified");
        
        return true;
        
    }
    
    function getRole(address _addr) public constant returns
    (roles, bytes32, uint)
    {
        assert(chair_person == msg.sender);
        
        return (entityDB[_addr].roles_assigned, entityDB[_addr].name, 
        entityDB[_addr].amount_assigned);
    }
    
}

contract ProductDetails is Verifier{
    
    enum conditions{undamaged, temperature_maintained, agree_upon_amount, none}
    
    
    struct distributor{
        address distributor_public_address;
        bytes32 distributor_product_info;
        uint distributor_product_quantity;
        uint distributor_product_value;
        uint distributor_timestamp;
        conditions d;
    }
    
    struct retailer{
        address retailer_public_address;
        bytes32 retailer_product_info;
        uint retailer_product_quantity;
        uint retailer_product_value;
        uint retailer_timestamp;
        conditions r;
    }
    
    struct Product{
        
        address producer_address;
        bytes32 producer_product_name;
        bytes32 producer_product_info;
        bytes32 organic;
        uint producer_product_quantity;
        uint producer_product_value;
        uint producer_timestamp;
        bytes32 exp_date;
        conditions p;
        
        mapping(address => distributor)distributors;
        mapping(address => retailer)retailers;
        
        
        address[] dist_addr;
        address[] ret_addr;
        bytes32[] dist_names;
        bytes32[] ret_names;
        uint[] dist_timestamp;
        uint[] ret_timestamp;
    }
    
    mapping(uint => Product) ProductDB;
    
    uint prod_count;
    
    uint[] product_count;
    uint[] product_id;
    bytes32[] product_producer_name;
    address[] product_producer_public_addr;
    bytes32[] product_producer_entity_info;
    uint[] product_quantity;
    bytes32[] product_name;
    bytes32[] product_organic;
    conditions[] product_condition;
    uint[] product_price;
    bytes32[] pexp_date;
    uint[] _timestamp;
    
    uint dist_count;
    
    uint[] Distcount;
    uint[] DistProduct_id;
    bytes32[] DistProduct_name;
    bytes32[] Dist_name;
    address[] Dist_public_add;
    uint[] Dist_quantity;
    uint[] Dist_product_price;
    conditions[] Dist_condition;
    
    
    
    
    modifier onlyProducer(address _address){
       require(entityDB[_address].roles_assigned == roles.Producer);
       _;
    }
    
    modifier onlyDistributor(address _address){
        require(entityDB[_address].roles_assigned == roles.Distributor);
       _;
    }
    
    modifier onlyRetailer(address _address){
        require(entityDB[_address].roles_assigned == roles.Retailer);
       _;
    }
    
    /// events
    event LogProductDetailsByProducer(uint ProductID,bytes32 Product_Name,
    address Producer_Address,bytes32 Info,uint Quantity, uint Price,string);
    event LogPaymentByDistributor(address Distributor,uint ProductID,uint Quantity,address Producer,string);
    event LogProductDetailsByDistributor(address Distributor,uint ProductID,uint Price,conditions,string);
    event LogPaymentByRetailer(address Retailer,uint ProductID,uint Quantity,address Distributor,string);
    
    constructor() public{
        prod_count = 0;
        dist_count = 0;
    }
    
    function producerEnterProductDetails(uint id, bytes32 _producer_product_name,
    bytes32 _producer_product_info, bytes32 _organic, uint _producer_product_quantity, 
    uint _producer_product_value, bytes32 _exp_date, conditions _p_in) 
    public returns(bool)
    {
        ProductDB[id].producer_address = msg.sender;
        ProductDB[id].producer_product_name = _producer_product_name;
        ProductDB[id].producer_product_info = _producer_product_info;
        ProductDB[id].organic = _organic;
        ProductDB[id].producer_product_quantity = _producer_product_quantity;
        ProductDB[id].producer_product_value = _producer_product_value;
        ProductDB[id].p = _p_in;
        ProductDB[id].producer_timestamp = now;
        ProductDB[id].exp_date = _exp_date;
        
        
        
        product_count.push(prod_count);
        product_id.push(id);
        product_quantity.push(_producer_product_quantity);
        product_name.push(_producer_product_name);
        product_condition.push(_p_in);
        product_price.push(_producer_product_value);
        product_producer_name.push(entityDB[msg.sender].name);
        product_producer_public_addr.push(msg.sender);
        product_producer_entity_info.push(entityDB[msg.sender].entity_info);
        pexp_date.push(_exp_date);
        _timestamp.push(ProductDB[id].producer_timestamp);
        product_organic.push(_organic);
        
        
        prod_count ++;
        
        emit LogProductDetailsByProducer(id,ProductDB[id].producer_product_name,
    msg.sender,_producer_product_info,_producer_product_quantity, _producer_product_value,"Product entry successful");
        
        
        return true;
        
    }
    
    function displayForDistributor1() constant public returns(uint[], uint[], uint[],
    uint[], bytes32[], bytes32[], conditions[])
    {
        return(product_count, product_id, product_quantity, product_price, product_name, 
        product_organic, product_condition);
    }
    
    function dispalyForDistirbutor2() constant public returns(uint[], bytes32[], bytes32[], address[], 
    bytes32[])
    {
        return (_timestamp, pexp_date, product_producer_name, product_producer_public_addr, 
        product_producer_entity_info);
    }
    
    
    function distributorBuyProduct(uint id, uint _quantity, address _addr, 
    conditions _p_in)  public returns(bool)
    {
     require(entityDB[_addr].roles_assigned == entityDB[ProductDB[id].producer_address].roles_assigned);
     require(entityDB[msg.sender].amount_assigned >= (_quantity * ProductDB[id].producer_product_value)); 
     require(ProductDB[id].p == _p_in);
     
     entityDB[_addr].amount_assigned += _quantity * ProductDB[id].producer_product_value;
     entityDB[msg.sender].amount_assigned -= _quantity * ProductDB[id].producer_product_value;
     
     ProductDB[id].dist_addr.push(msg.sender);
     ProductDB[id].dist_timestamp.push(now);
     ProductDB[id].dist_names.push(entityDB[msg.sender].name);
     
     ProductDB[id].distributors[msg.sender].distributor_public_address = msg.sender;
     ProductDB[id].distributors[msg.sender].distributor_timestamp = now;
     ProductDB[id].distributors[msg.sender].distributor_product_quantity += _quantity;
     
     ProductDB[id].producer_product_quantity -= _quantity;
     
     Distcount.push(dist_count);
     DistProduct_id.push(id);
     DistProduct_name.push(ProductDB[id].producer_product_name);
     Dist_name.push(entityDB[msg.sender].name);
     Dist_quantity.push(_quantity);
     Dist_public_add.push(msg.sender);
     
     dist_count ++;
     
     emit LogPaymentByDistributor(msg.sender,id,_quantity,_addr,"Payment is successful");
     return true;
    }
    
    function distributorProductDetails(uint id, bytes32 _distributor_product_info,
    uint _distributor_product_value, conditions _d_in) public returns (bool)
    {
        ProductDB[id].distributors[msg.sender].distributor_product_info = 
        _distributor_product_info;
        
        ProductDB[id].distributors[msg.sender].distributor_product_value =
        _distributor_product_value;
        
        ProductDB[id].distributors[msg.sender].d = _d_in;
        
        Dist_product_price.push(_distributor_product_value);
        Dist_condition.push(_d_in);
        
        emit LogProductDetailsByDistributor(msg.sender,id,_distributor_product_value,_d_in,"Distributor Entry Successful");
        
        return true;
    }
    
    function displayForRetailer1() public constant returns(uint[], uint[], bytes32[], bytes32[], bytes32[],
    address[])
    {
    return( Distcount, DistProduct_id, DistProduct_name, pexp_date, Dist_name, Dist_public_add);
    }
    
    function displayForRetailer2() public constant returns( uint[], uint[], conditions[])
    {
    return(Dist_quantity, Dist_product_price, Dist_condition);
    }
    
    
    function RetailerBuyProduct(uint id, uint _quantity, address _addr, 
    conditions _d_in)  public returns(bool)
    {
      require(entityDB[_addr].roles_assigned == entityDB[ProductDB[id].distributors[_addr].distributor_public_address].roles_assigned);
      require(entityDB[msg.sender].amount_assigned >= (_quantity * ProductDB[id].distributors[_addr].distributor_product_value)); 
      require(ProductDB[id].distributors[_addr].d == _d_in);
     
     entityDB[_addr].amount_assigned += _quantity * ProductDB[id].distributors[_addr].distributor_product_value;
     entityDB[msg.sender].amount_assigned -= _quantity * ProductDB[id].distributors[_addr].distributor_product_value;
     
     ProductDB[id].ret_addr.push(msg.sender);
     ProductDB[id].ret_timestamp.push(now);
     ProductDB[id].ret_names.push(entityDB[msg.sender].name);
     
     ProductDB[id].retailers[msg.sender].retailer_public_address = msg.sender;
     ProductDB[id].retailers[msg.sender].retailer_timestamp = now;
     ProductDB[id].retailers[msg.sender].retailer_product_quantity += _quantity;
     
     ProductDB[id].distributors[_addr].distributor_product_quantity -= _quantity;
     
     emit LogPaymentByRetailer(msg.sender,id,_quantity,_addr,"Retailer payment Successful");
     
     return true;
    }
    
    function FDA(uint id) constant public returns(bytes32, uint, bytes32[], uint[]
    , bytes32[], uint[]) 
    {
        return(entityDB[ProductDB[id].producer_address].name, ProductDB[id].producer_timestamp,
        ProductDB[id].dist_names,ProductDB[id].dist_timestamp,ProductDB[id].ret_names,
        ProductDB[id].ret_timestamp);
    }
    
    function general_public(uint id) constant public returns(bytes32, bytes32
    , bytes32, bytes32, bytes32, uint, bytes32)
    {
        return(entityDB[ProductDB[id].producer_address].name,
                entityDB[ProductDB[id].producer_address].entity_info,
                ProductDB[id].producer_product_name,
                ProductDB[id].producer_product_info,
                ProductDB[id].organic,
                ProductDB[id].producer_timestamp,
                ProductDB[id].exp_date);
    }
    
    function getAmount(address _addr) public constant returns(uint)
    {
        return (entityDB[_addr].amount_assigned);
    }
    
}
