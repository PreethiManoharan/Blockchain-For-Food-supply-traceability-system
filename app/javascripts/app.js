import '../stylesheets/bootstrap.min.css';
import '../stylesheets/dataTables.bootstrap4.css';
import '../stylesheets/bootstrap-grid.min.css';
import '../stylesheets/bootstrap-reboot.min.css';
import '../stylesheets/sb-admin.min.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js';
import './browser-solc.js';

var accounts;
var account;
var foodSafeContract;
var foodSafeCode;
var roles = {PRODUCER: "Producer" ,DISTRIBUTOR:"Distributor", RETAILER:"Retailer",NONE:"none"};
//var Accounts = require('web3-eth-accounts');
//var accounts = new Accounts('ws://localhost:8545');



window.App = {
  start: function () {
    var self = this;
    web3.eth.getAccounts(function (err, accs) {
      
      console.log(accs);
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;

      BrowserSolc.loadVersion('soljson-v0.4.17+commit.bdeb9e52.js', function (compiler) {
        
        foodSafeContract = web3.eth.contract([
  {
    "constant": true,
    "inputs": [],
    "name": "displayForRetailer1",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "displayForRetailer2",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint8[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_distributor_product_info",
        "type": "bytes32"
      },
      {
        "name": "_distributor_product_value",
        "type": "uint256"
      },
      {
        "name": "_d_in",
        "type": "uint8"
      }
    ],
    "name": "distributorProductDetails",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_producer_product_name",
        "type": "bytes32"
      },
      {
        "name": "_producer_product_info",
        "type": "bytes32"
      },
      {
        "name": "_organic",
        "type": "bytes32"
      },
      {
        "name": "_producer_product_quantity",
        "type": "uint256"
      },
      {
        "name": "_producer_product_value",
        "type": "uint256"
      },
      {
        "name": "_exp_date",
        "type": "bytes32"
      },
      {
        "name": "_p_in",
        "type": "uint8"
      }
    ],
    "name": "producerEnterProductDetails",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getRole",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_email",
        "type": "bytes32"
      },
      {
        "name": "_password",
        "type": "bytes32"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "general_public",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "dispalyForDistirbutor2",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "address[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_count",
        "type": "uint256"
      },
      {
        "name": "_addr",
        "type": "address"
      },
      {
        "name": "_role",
        "type": "uint8"
      },
      {
        "name": "_amt",
        "type": "uint256"
      }
    ],
    "name": "setRole",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "FDA",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "bytes32"
      },
      {
        "name": "_email",
        "type": "bytes32"
      },
      {
        "name": "_password",
        "type": "bytes32"
      },
      {
        "name": "_warehouse",
        "type": "bytes32"
      },
      {
        "name": "_entity_type",
        "type": "bytes32"
      },
      {
        "name": "_entity_info",
        "type": "bytes32"
      }
    ],
    "name": "setEntityInfo",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "displayForDistributor1",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "uint8[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getEntityInfo",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      },
      {
        "name": "",
        "type": "address[]"
      },
      {
        "name": "",
        "type": "uint8[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      },
      {
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "chair_person",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_addr",
        "type": "address"
      },
      {
        "name": "_d_in",
        "type": "uint8"
      }
    ],
    "name": "RetailerBuyProduct",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_addr",
        "type": "address"
      },
      {
        "name": "_p_in",
        "type": "uint8"
      }
    ],
    "name": "distributorBuyProduct",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "ProductID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Product_Name",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Producer_Address",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "Info",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "string"
      }
    ],
    "name": "LogProductDetailsByProducer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "Distributor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "ProductID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Producer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "",
        "type": "string"
      }
    ],
    "name": "LogPaymentByDistributor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "Distributor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "ProductID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint8"
      },
      {
        "indexed": false,
        "name": "",
        "type": "string"
      }
    ],
    "name": "LogProductDetailsByDistributor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "Retailer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "ProductID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Distributor",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "",
        "type": "string"
      }
    ],
    "name": "LogPaymentByRetailer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "printInfo",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "Name",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Email",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Warehouse",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Entity_type",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Entity_info",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Role",
        "type": "uint8"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "LogEntityInfoSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "Count",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "Address",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "Name",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "Role",
        "type": "uint8"
      },
      {
        "indexed": false,
        "name": "sent",
        "type": "string"
      }
    ],
    "name": "LogRoleSet",
    "type": "event"
  }
]);
       
      });
    });
  },

  initialFunct: function(){
    document.getElementById('login').style.display = "none";
    document.getElementById('register').style.display = "none";
    document.getElementById('product').style.display = "none";
    document.getElementById('chairperson').style.display = "none";
    document.getElementById('producer').style.display = "none";
    document.getElementById('distributor').style.display = "none";
    document.getElementById('retailer').style.display = "none";
  },

  showLogin: function(){
    document.getElementById('index').style.display = "none";
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "block";
  },

  showRegister: function(){
    document.getElementById('index').style.display = "none";
    document.getElementById('login').style.display = "none";
    document.getElementById('register').style.display = "block";
  },

  showProduct: function(){
    document.getElementById('product').style.display = "block";
    document.getElementById('index').style.display = "none";
    document.getElementById('login').style.display = "none";
    document.getElementById('register').style.display = "none";
    document.getElementById('prod_FDADetails').style.display = "none";
  },
  
  setEntityInfo: function () {

    var _name = document.getElementById('exampleInputName').value;
    var _addr = document.getElementById('warehouseAddress').value;
    var _password = document.getElementById('exampleInputPassword1').value;
    var _email = document.getElementById('exampleInputEmail1').value;
    var _entity_info = document.getElementById('additionalInfo').value;
    var _entity_job = document.getElementById('exampleRole').value;

    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');

    deployedFoodSafe.setEntityInfo( _name, _email, _password, _addr, _entity_job, _entity_info,  function (error) {
      if (error) {
        console.error(error);
        return;
      }
      
      var logEntity = deployedFoodSafe.LogEntityInfoSet();
      logEntity.watch(function(error,result) {
        if(!error) {
    
          console.log(web3.toAscii(result.args.Name));
          console.log(web3.toAscii(result.args.Entity_type));
 
          console.log(result);
        }
      });
      document.getElementById('register').style.display = "none";
      document.getElementById('login').style.display = "block";
    });
  },


  showFDA: function(){
    $("#prod_FDADetails").show(); 
    $("#prod_ViewDetails").hide();    
  },

  showProductDetails: function(){
    $("#prod_FDADetails").hide(); 
    $("#prod_ViewDetails").show();    
  },

  showSetRole: function(){
    $("#ch_SetEntityRole").show(); 
    $("#ch_ViewEntityRole").hide();       
    $("#ch_ViewEntityDetails").hide();
  },

  showGetRole: function(){
    $("#ch_SetEntityRole").hide();
    $("#ch_ViewEntityDetails").hide();
    $("#ch_ViewEntityRole").show();
  },

  showPr_ProductDetails: function(){
    $("#pr_EnterDetails").show();
    $("#pr_ViewDetails").hide();
  },

  showDi_ProductDetails: function(){
    $("#di_EnterDetails").show();
    $("#di_MakeTransaction").hide();
    $("#di_producerProducts").hide();
    $("#di_ViewDetails").hide();
  },


  showDi_Purchase: function(){
    $("#di_EnterDetails").hide();
    $("#di_MakeTransaction").show();
    $("#di_producerProducts").hide();
    $("#di_ViewDetails").hide();
  },

  showRe_Purchase: function(){
    $("#re_MakeTransaction").show();
    $("#re_ViewDetails").hide();
  },

  login: function () {

    var _userEmail = document.getElementById('exampleInputEmail2').value;
    var _userPass = document.getElementById('exampleInputPassword2').value;
    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');

    function checkRole (val) {
      switch(val) {
            case '0':
            var role = roles.PRODUCER;
            break;
            case '1':
            var role = roles.DISTRIBUTOR;
            break;
            case '2':
            var role = roles.RETAILER;
            break;
            default:
            var role = roles.NONE;
            break;
      }
      return role;
    }

    function showChairperson() {
      document.getElementById('chairperson').style.display = "block";
      document.getElementById('index').style.display = "none";
      document.getElementById('login').style.display = "none";
      document.getElementById('register').style.display = "none";
      $("#ch_SetEntityRole").hide();
      $("#ch_ViewEntityRole").hide();
    }

    function showProducer() {
      document.getElementById('producer').style.display = "block";
      document.getElementById('index').style.display = "none";
      document.getElementById('login').style.display = "none";
      document.getElementById('register').style.display = "none";
      $("#pr_EnterDetails").hide();
      $("#pr_ViewDetails").hide();
    }

    function showDistributor() {
      document.getElementById('distributor').style.display = "block";
      document.getElementById('index').style.display = "none";
      document.getElementById('login').style.display = "none";
      document.getElementById('register').style.display = "none";
      $("#di_EnterDetails").hide();
      $("#di_MakeTransaction").hide();
      $("#di_producerProducts").hide();
      $("#di_ViewDetails").hide();
    }

    function showRetailer() {
      document.getElementById('retailer').style.display = "block";
      document.getElementById('index').style.display = "none";
      document.getElementById('login').style.display = "none";
      document.getElementById('register').style.display = "none";
      $("#re_MakeTransaction").hide();
      $("#re_ViewDetails").hide();
    }

    deployedFoodSafe.login( _userEmail,_userPass,  function (error,returnValue) {
      if (error) {
        console.error(error);
        return;
      } console.log(checkRole(returnValue.toString()));

      switch(returnValue.toString()) {
            case '0':
            showProducer();
            break;
            case '1':
            showDistributor();
            break;
            case '2':
            showRetailer();
            break;
            default:
      }


            //showChairperson();

    });
  },

  getEntityInfo: function () {

    $("#ch_SetEntityRole").hide();
    $("#ch_ViewEntityDetails").show();
    $("#ch_ViewEntityRole").hide();
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');

    function checkRole (val) {
      switch(val) {
            case '0':
            var role = roles.PRODUCER;
            break;
            case '1':
            var role = roles.DISTRIBUTOR;
            break;
            case '2':
            var role = roles.RETAILER;
            break;
            default:
            var role = roles.NONE;
            break;
      }
      return role;
    }

      
      deployedFoodSafe.getEntityInfo.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        var index = returnValues - 1;
        if (index < 0) {
          return;
        }
        
        console.log(returnValues);
       
        var table = document.getElementById('getEntityTable');
         for(var i=0;i<returnValues[0].length;i++) {
          var tr = document.createElement('tr'); 
          var td0 = document.createElement('td');  
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          var td3 = document.createElement('td');
          var td4 = document.createElement('td');
          var enID = document.createTextNode(returnValues[0][i]);
          var name = document.createTextNode(web3.toAscii(returnValues[3][i]));
          var role = document.createTextNode(checkRole(returnValues[2][i].toString()));
          var address = document.createTextNode(returnValues[1][i]);
          var entityType = document.createTextNode(web3.toAscii(returnValues[4][i]));
          td0.appendChild(enID);
          td1.appendChild(name);
          td2.appendChild(address);
          td3.appendChild(role);
          td4.appendChild(entityType);
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          table.appendChild(tr);
         }
      });
    
  },

  setRole: function () {
    var setCount = document.getElementById('setCount').value;
    var setAddress = document.getElementById('entityAdd').value;
    var setRole = document.getElementById('role').value;
    var setAmount = document.getElementById('amount').value;
    
    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');

    deployedFoodSafe.setRole( setCount,setAddress,setRole,setAmount,  function (error) {
      if (error) {
        console.error(error);
        return;
      }
      var logr = deployedFoodSafe.LogRoleSet();
      logr.watch(function(error,result) {
        if(!error) {   
          console.log(result);
        }else{
          console.log(error);
        }
      });
    });
  },


  getRole: function () {

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var address=document.getElementById('entityAdd1').value;
    
      
      deployedFoodSafe.getRole.call(address,function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        function checkRole(val) {
          switch(val) {
            case '0':
              var role = roles.PRODUCER; 
              break;
            case '1':
              var role = roles.DISTRIBUTOR;
              break;
            case '2':
              var role = roles.RETAILER;
              break;
          }
          return role;
        }
        
        
        document.getElementById('getRole').value = checkRole(returnValues[0].toString());
        document.getElementById('getName').value = web3.toAscii(returnValues[1]);
        document.getElementById('getAmount').value = returnValues[2];
        console.log(returnValues);
      });
  },

  producerEnterProductDetails: function () {

    var _id = document.getElementById('_id').value;
    var _name = document.getElementById('_pname').value;
    var _organic = document.getElementById('_organic').value;
    var _infog = document.getElementById('_infog').value;
    var _quantity = document.getElementById('_quantity').value;
    var _price = document.getElementById('_price').value;
    var _expDate = document.getElementById('_expDate').value;
    var _cond = document.getElementById('_cond').value;

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');

    deployedFoodSafe.producerEnterProductDetails( _id, _name, _infog, _organic,  _quantity, _price, _expDate, _cond,  function (error) {
      if (error) {
        console.error(error);
        return;
      }
      
      var logp = deployedFoodSafe.LogProductDetailsByProducer();
      logp.watch(function(error,resultp) {
        if(!error) {
        
          //document.getElementById('print').innerText = result.args.Detail;
          
          console.log(resultp);
        }
      });
    });
  },

  displayForDistributor1: function () {
    $("#pr_EnterDetails").hide();
    $("#pr_ViewDetails").show();
    $("#di_EnterDetails").hide();
    $("#di_MakeTransaction").hide();
    $("#di_producerProducts").show();
    $("#di_ViewDetails").hide();

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var prodName = [];
    var prodOrg = [];
    var prodCond = [];
    var prodID = [];
    var prodQuant = [];
    var prodPrice = [];
    var prodmfg = [];
    var producer_Address = [];

    function checkCondition(val) {
      switch(val) {
            case '0':
            var con = "Undamaged";
            break;
            case '1':
            var con = "Undamaged, Temperature Controlled";
            break;
            case '2':
            var con = "Temperature Controlled";
            break;
            default:
            var con = "no condition specified";
            break;
      }
      return con;
    }

   
    deployedFoodSafe.displayForDistributor1.call(function (error, trailCount) {
      if (error) {
        console.error(error);
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        return;
      }
      
      var len= trailCount[0].length;
      deployedFoodSafe.displayForDistributor1.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        console.log(returnValues);
        
        for(var i=0;i<returnValues[0].length;i++) {
          prodID.push(returnValues[1][i]);
          prodQuant.push(returnValues[2][i]);
          prodPrice.push(returnValues[3][i]);
          prodName.push(web3.toAscii(returnValues[4][i]));
          prodOrg.push(web3.toAscii(returnValues[5][i]));
          prodCond.push(checkCondition(returnValues[6][i].toString()));
        }  
            

        deployedFoodSafe.dispalyForDistirbutor2.call(function (error, returnValue) {
          if (error) {
            console.error(error);
            return;
          }
          
          console.log(returnValue);
          for(var i=0;i<returnValues[0].length;i++) {
            prodmfg.push(returnValue[0][i]);
            producer_Address.push(returnValue[3]);
          }


          var table = document.getElementById('producerProductTable');
               for(var i=0;i<prodID.length;i++) {
                var tr = document.createElement('tr');   
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var td7 = document.createElement('td');
                var td8 = document.createElement('td');
                var id = document.createTextNode(prodID[i]);
                var name = document.createTextNode(prodName[i]);
                var quantity = document.createTextNode(prodQuant[i]);
                var price = document.createTextNode(prodPrice[i]);
                var organic = document.createTextNode(prodOrg[i]);
                var mfg = document.createTextNode(prodmfg[i]);
                var condition = document.createTextNode(prodCond[i]);
                var producerAddress = document.createTextNode(producer_Address[i]);
                td1.appendChild(id);
                td2.appendChild(name);
                td3.appendChild(quantity);
                td4.appendChild(price);
                td5.appendChild(organic);
                td6.appendChild(condition);
                td7.appendChild(mfg);
                td8.appendChild(producerAddress);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                table.appendChild(tr);
            }

          var table1 = document.getElementById('distributorPrProductTable');
               for(var i=0;i<prodID.length;i++) {
                var tr = document.createElement('tr');   
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var td7 = document.createElement('td');
                var td8 = document.createElement('td');
                var id = document.createTextNode(prodID[i]);
                var name = document.createTextNode(prodName[i]);
                var quantity = document.createTextNode(prodQuant[i]);
                var price = document.createTextNode(prodPrice[i]);
                var organic = document.createTextNode(prodOrg[i]);
                var mfg = document.createTextNode(prodmfg[i]);
                var condition = document.createTextNode(prodCond[i]);
                var producerAddress = document.createTextNode(producer_Address[i]);
                td1.appendChild(id);
                td2.appendChild(name);
                td3.appendChild(quantity);
                td4.appendChild(price);
                td5.appendChild(organic);
                td7.appendChild(mfg);
                td6.appendChild(condition);
                td8.appendChild(producerAddress);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                tr.appendChild(td8);
                table1.appendChild(tr);
            }
        
        });
        
      });
    });
  },
  

  distributorBuyProduct: function() {
    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var _dpid = document.getElementById('_dproductID').value;
    var _damt = document.getElementById('_dquantity').value;
    var _daddr = document.getElementById('_daddress').value;
    var _dcond = document.getElementById('_dcondition').value;

    deployedFoodSafe.distributorBuyProduct( _dpid, _damt, _daddr, _dcond, function(error) {
      if (error) {
        console.log(error);
        return;
      }
      var logPayment = deployedFoodSafe.LogPaymentByDistributor();
      logPayment.watch(function(error,result) {
        if(!error) {
        //   document.getElementById('blockHash1').innerText = result.blockHash;
        //  // var str1 = web3.toAscii(result.args.Name);
        //  // document.getElementById('ename').innerText = str1;
        //   document.getElementById('print1').innerText = result.args.Detail;
          
          console.log(result);
        }
      });
    });
  },

  distributorProductDetails: function() {
    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var _dppid = document.getElementById('_dppid').value;
    var _dpinfo = document.getElementById('_dpinfo').value;
    var _dpvalue = document.getElementById('_dpvalue').value;
    var _dpcond = document.getElementById('_dpcond').value;

    deployedFoodSafe.distributorProductDetails( _dppid, _dpinfo, _dpvalue, _dpcond, function(error) {
      if (error) {
        console.log(error);
        return;
      }
      
      var logd = deployedFoodSafe.LogProductDetailsByDistributor();
      logd.watch(function(error,resultd) {
        if(!error) {
          
          console.log(resultd);
        }
      });
    });
  },

  displayForRetailer1: function () {

    //var passPhrase = document.getElementById('passPhrase').value;
    $("#di_EnterDetails").hide();
    $("#di_MakeTransaction").hide();
    $("#di_producerProducts").hide();
    $("#di_ViewDetails").show();
    $("#re_MakeTransaction").hide();
    $("#re_ViewDetails").show();

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var prodName = [];
    var prodCond = [];
    var prodID = [];
    var prodQuant = [];
    var prodPrice = [];
    var distributor_Address = [];

    function checkCondition(val) {
      switch(val) {
            case '0':
            var con = "Undamaged";
            break;
            case '1':
            var con = "Undamaged, Temperature Controlled";
            break;
            case '2':
            var con = "Temperature Controlled";
            break;
            default:
            var con = "no condition specified";
            break;
      }
      return con;
    }
    
    deployedFoodSafe.displayForRetailer1.call(function (error, trailCount) {
      if (error) {
        console.error(error);
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        return;
      }
      
      var len = trailCount[0].length;
      deployedFoodSafe.displayForRetailer1.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        console.log(returnValues);
        
        for(var i=0;i<len;i++) {
          prodID.push(returnValues[1][i]);
          prodName.push(web3.toAscii(returnValues[2][i]));
          distributor_Address.push(returnValues[5][i]); 
        }
        
        deployedFoodSafe.displayForRetailer2.call(function (error, returnVal) {
          if (error) {
            console.error(error);
            return;
          }
          console.log(returnVal);
          for(var i=0;i<len;i++) {
            prodQuant.push(returnVal[0][i]);
            prodPrice.push(returnVal[1][i]);
            prodCond.push(checkCondition(returnVal[2][i].toString()));
          }

          var table = document.getElementById('distProductTable');
               for(var i=0;i<prodID.length;i++) {
                var tr = document.createElement('tr');   
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var id = document.createTextNode(prodID[i]);
                var name = document.createTextNode(prodName[i]);
                var quantity = document.createTextNode(prodQuant[i]);
                var price = document.createTextNode(prodPrice[i]);
                var condition = document.createTextNode(prodCond[i]);
                var distributorAddress = document.createTextNode(distributor_Address[i]);
                td1.appendChild(id);
                td2.appendChild(name);
                td3.appendChild(quantity);
                td4.appendChild(price);
                td5.appendChild(condition);
                td6.appendChild(distributorAddress);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                table.appendChild(tr);
            }

          var table1 = document.getElementById('retailerProductTable');
               for(var i=0;i<prodID.length;i++) {
                var tr = document.createElement('tr');   
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');
                var td6 = document.createElement('td');
                var id = document.createTextNode(prodID[i]);
                var name = document.createTextNode(prodName[i]);
                var quantity = document.createTextNode(prodQuant[i]);
                var price = document.createTextNode(prodPrice[i]);
                var condition = document.createTextNode(prodCond[i]);
                var distributorAddress = document.createTextNode(distributor_Address[i]);
                td1.appendChild(id);
                td2.appendChild(name);
                td3.appendChild(quantity);
                td4.appendChild(price);
                td5.appendChild(condition);
                td6.appendChild(distributorAddress);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                table1.appendChild(tr);
            }
        });
        
      });
    });
  },
  
  RetailerBuyProduct: function() {
    
    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    var _drpid = document.getElementById('_drpid').value;
    var _dramt = document.getElementById('_dramt').value;
    var _draddr = document.getElementById('_draddr').value;
    var _drcond = document.getElementById('_drcond').value;

    deployedFoodSafe.RetailerBuyProduct( _drpid, _dramt, _draddr, _drcond, function(error) {
      if (error) {
        console.log(error);
        return;
      }

      var logPayment = deployedFoodSafe.LogPaymentByRetailer();
      logPayment.watch(function(error,result) {
        if(!error) {
        //   document.getElementById('blockHash2').innerText = result.blockHash;
        //  // var str1 = web3.toAscii(result.args.Name);
        //  // document.getElementById('ename').innerText = str1;
        //   document.getElementById('print2').innerText = result.args.Detail;
          
          console.log(result);
        }
      });
    });
  },

  // enterRetailerDetails: function() {
    
  //   var deployedFoodSafe = foodSafeContract.at('0x61b5c16e210039b88bc4942b0dd897b2ce430259');
  //   var _rpid = document.getElementById('_rpid').value;
  //   var _rinfo = document.getElementById('_rinfo').value;
  //   var _rvalue = document.getElementById('_rvalue').value;
  //   var _rcond = document.getElementById('_rcond').value;

  //   deployedFoodSafe.enterRetailerDetails( _rpid, _rinfo, _rvalue, _rcond, function(error) {
  //     if (error) {
  //       console.log(error);
  //       document.getElementById('message').innerText = error;
  //       return;
  //     }
      
  //     var logd = deployedFoodSafe.LogProductDetailsByRetailer();
  //     logd.watch(function(error,resultd) {
  //       if(!error) {
          
  //         console.log(resultd);
  //       }
  //     });
  //     document.getElementById('message').innerText = 'Details are entered';
  //   });
  // },

  // getProductInfoByRetailer1: function () {
  //   document.getElementById('message').innerText = 'getting Product details...';

  //   //var passPhrase = document.getElementById('passPhrase').value;

  //   var deployedFoodSafe = foodSafeContract.at('0x61b5c16e210039b88bc4942b0dd897b2ce430259');
  //   var _rpid=document.getElementById('_rpid').value;
  //   deployedFoodSafe.getProductInfoByRetailer1.call(_rpid,function (error, trailCount) {
  //     if (error) {
  //       console.error(error);
  //       document.getElementById('message').innerText = error;
  //       return;
  //     }

  //     var index = trailCount - 1;
  //     if (index < 0) {
  //       document.getElementById('message').innerText = 'No data found.';
  //       return;
  //     }
      
      
  //     deployedFoodSafe.getProductInfoByRetailer1.call(_rpid,function (error, returnValues) {
  //       if (error) {
  //         console.error(error);
  //         document.getElementById('message').innerText = error;
  //         return;
  //       }
        
  //       console.log(returnValues);
  //       document.getElementById('_rroles').value =returnValues[0];
  //       var ro = document.getElementById('_rroles').value;
  //       switch(ro) {
  //         case '0':
  //         var role = roles.PRODUCER;
  //         break;
  //         case '1':
  //         var role = roles.DISTRIBUTOR;
  //         break;
  //         case '2':
  //         var role = roles.RETAILER;
  //         break;
  //         default:
  //         break;
  //       }
  //       var r1 = web3.toAscii(returnValues[1]);
  //       var r2 = web3.toAscii(returnValues[2]);
  //       var r3 = web3.toAscii(returnValues[3]);
  //       document.getElementById('_rroles').value = role;
  //       document.getElementById('_rname').value = r1;
  //       document.getElementById('_raddr').value = r2;
  //       document.getElementById('_rentity_info').value = r3;

  //       deployedFoodSafe.getProductInfoByRetailer2.call(_rpid,function (error, returnVal) {
  //         if (error) {
  //           console.error(error);
  //           document.getElementById('message').innerText = error;
  //           return;
  //         }
          
  //         console.log(returnVal);
  //         var r4 = web3.toAscii(returnVal[0]);
  //         document.getElementById('_rpinfo').value =r4;
  //         document.getElementById('_rpvalue').value = returnVal[1];
  //         document.getElementById('_rptime').value = Date();
  //       });
        
  //     });
  //   });
  // },


  FDA: function () {
    var _fID = document.getElementById("fID").value;

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    
    deployedFoodSafe.FDA.call(_fID,function (error, trailCount) {
      if (error) {
        console.error(error);
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        return;
      }
      
      
      deployedFoodSafe.FDA.call(_fID,function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        console.log(returnValues);
        
        
        document.getElementById('_fname').value = web3.toAscii(returnValues[0]);
        document.getElementById('_ftime').value = returnValues[1];
        var fdname =[];
        var fdtime = "";
        var frname = [];
        var frtime = "";
        for(var i=0;i<returnValues[2].length;i++) {
          fdname.push(returnValues[2][i]);
          fdtime += returnValues[3][i];
          frname.push(returnValues[4][i]);
          frtime += returnValues[5][i];
        }
        
        for(var j=0;j<returnValues[2].length;j++) {
        document.getElementById('fdname').value += web3.toAscii(fdname[j]);
        document.getElementById('frname').value += web3.toAscii(frname[j]);
        document.getElementById('fdtime').value = fdtime;
        document.getElementById('frtime').value = frtime;
        }
        
      });
    });
  },

  
  general_public: function () {
    var _gID = document.getElementById("_gID").value;

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    
    deployedFoodSafe.general_public.call(_gID,function (error, trailCount) {
      if (error) {
        console.error(error);
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        return;
      }
      
      
      deployedFoodSafe.general_public.call(_gID,function (error, returnValues) {
        if (error) {
          console.error(error);
          return;
        }
        
        console.log(returnValues);
        console.log(web3.toAscii(returnValues[0]));
        console.log(web3.toAscii(returnValues[1]));
        console.log(web3.toAscii(returnValues[2]));
        console.log(web3.toAscii(returnValues[3]));
        
        document.getElementById('_gname').value = web3.toAscii(returnValues[0]);
        document.getElementById('_ginfo').value = web3.toAscii(returnValues[1]);
        document.getElementById('_gpname').value = web3.toAscii(returnValues[2]);
        document.getElementById('_gpinfo').value = web3.toAscii(returnValues[3]);
        document.getElementById('_gorg').value = web3.toAscii(returnValues[4]);
        document.getElementById('_gdate').value = returnValues[5];
        

        // deployedFoodSafe.getBasicProductInfo2.call(_pid3,function (error, returnVal) {
        //   if (error) {
        //     console.error(error);
        //     document.getElementById('message').innerText = error;
        //     return;
        //   }
          
        //   var r5 = web3.toAscii(returnVal[0]);
        //   var r6 = web3.toAscii(returnVal[1]);
        //   var r7 = web3.toAscii(returnVal[2]);
        //   document.getElementById('_rcname1').value = r5;
        //   document.getElementById('_rpcaddr').value = r6;
        //   document.getElementById('_rcinfo').value = r7;
        // });
        
      });
    });
  },

  getAmount: function () {
    var _gAddress = document.getElementById("gAddress").value;

    var deployedFoodSafe = foodSafeContract.at('0xB9dacdbA0Ef94D58C75718a1488BfEDEB1F40fF1');
    
    deployedFoodSafe.getAmount.call(_gAddress,function (error, trailCount) {
      if (error) {
        console.error(error);
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        return;
      }
        
        console.log(trailCount);
         
        document.getElementById('_amt').innerHTML = trailCount;
        
      }); 
  },
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});