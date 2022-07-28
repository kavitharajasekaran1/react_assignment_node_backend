

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 2600 });
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();
const addTransaction =async (req,res)=>{
   
    let result =[];
    let finalObj = {}
    let {name,date,amount} = req.body.body;    
    let reward = await rewardCalculation(amount);
    finalObj ={ "name":name,
                "date" : date,
                "amount" : amount,
                "rewardPoints" : reward}
    let transactions = myCache.get('allTransactions')
    if(transactions == null || undefined){
        result.push(finalObj);
        myCache.set('allTransactions', result, 2600);
    }
    else {
        transactions.push(finalObj);
        myCache.set('allTransactions', transactions, 2600);
    }            

    

    res.status(200).json({message:"Transaction is added successfully"})
}

const getAllTransactions =async (req,res)=>{
    try{
        var firstMonth =[];
        var secondMonth =[];
        var thirdMonth =[];
        let currenMonth = d.getMonth()+ 1;
    var transactions = await myCache.get('allTransactions');
    let result =[]
    if(transactions !=undefined && transactions.length > 0){
       
     transactions.map(item=>{
        if(item.name == req.params.name.toString()){
            var month = item.date.substring(3,5);
  if(month != "12"){
    month = month.charAt(1)
  }
  if(month == currenMonth){
    firstMonth.push(item)
    
  }
  if(month == currenMonth + 1){
    secondMonth.push(item)
  }
  if(month == currenMonth + 2){
    thirdMonth.push(item)
  }

  
        result.push(item)
        }
        
    })

    var secondDataResult = [{"month": monthNames[d.getMonth()],"amount": firstMonth.reduce(function(sum, current) {
        return sum + Number(current.amount);
      }, 0),rewardPoints : firstMonth.reduce(function(sum, current) {
        return sum + Number(current.rewardPoints);
      }, 0)},
      {"month": monthNames[d.getMonth()+1],"amount": secondMonth.reduce(function(sum, current) {
        return sum + Number(current.amount);
      }, 0),rewardPoints : secondMonth.reduce(function(sum, current) {
        return sum + Number(current.rewardPoints);
      }, 0)},
      {"month": monthNames[d.getMonth()+2],"amount": thirdMonth.reduce(function(sum, current) {
        return sum + Number(current.amount);
      }, 0),rewardPoints : thirdMonth.reduce(function(sum, current) {
        return sum + Number(current.rewardPoints);
      }, 0)}]

    res.status(200).json({data:result,secondData : secondDataResult})
    
}

else{
    res.status(200).json({data : result,secondData : []})
    }
}
    catch(error){
        console.log(error)
    }


}

const rewardCalculation =(amount)=>{
    if (amount >=50 && amount < 100) { return amount-50; }
    else if (amount >100){ return (2*(amount-100) + 50)}
        else{
            return 0;
        }

}
module.exports = { addTransaction,
    getAllTransactions
}