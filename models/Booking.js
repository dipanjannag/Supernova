var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;
var task = {
  PartitionKey: entGen.String('hometasks'),
  RowKey: entGen.String('1'),
  description: entGen.String('take out the trash'),
  dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
};



var generateBooking = function(dateString, room_id, booked_by_email, startDate, endDate){
	var Booking = {
		PartitionKey : entGen.DateTime(new Date(dateString)),
		RowKey : entGen.String(room_id),
		booked_by : entGen.String(booked_by_email),
		start : entGen.DateTime(startDate),
		end : entGen(endDate)
	}
	return Booking;
}


var storeBooking = function(dateString, room_id, booked_by_email, start, end){
	var booking = generateBooking(dateString, room_id, booked_by_email, start, end);
	tableSvc.insertEntity('mytable',booking, function (error, result, response) {
		if(!error){
		  // Entity inserted
		}
	});

}


var process_booking = function(room_id, booked_by_email, start, end){
	var startDate = new Date(start);
	var endDate = new Date(end);
	if(endDate < startDate){
		return false;
	}
	var filter1 = TableQuery.stringFilter('start', QueryComparisons.LESS_THAN_OR_EQUAL, endDate);
	var filter1 = TableQuery.stringFilter('end', QueryComparisons.GREATER_THAN_OR_EQUAL, startDate);
	var combinedFilter = TableQuery.combineFilters(filter1, TableOperators.AND, filter2);
	tableSvc.queryEntities('mytable',query, null, function(error, result, response) {
		if(!error) {
		  // query was successful
		}
	});
}





