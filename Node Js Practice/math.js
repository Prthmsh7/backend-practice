// This is the first way of exporting

// function add(a,b){
// 	return a+b;
// }

// function sub(a,b){
// 	return a-b;
// }

// module.exports={
// 	add,
// 	sub,
// }

// this is the second way of exporting

exports.add = (a,b) =>{
	return a+b;
}

exports.sub = (a,b) =>{
	return a-b;
}