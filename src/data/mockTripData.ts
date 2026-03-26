// mockTripData.ts
// Full mock data for all trip modules. Replace with API calls later.

export const MOCK_TRIPS = [

{
id: "1",
tripId: "TRP-001",

// Fields used by Trips Table
tripNumber: "TRP-001",
bookingNumber: "BK-1001",
pickupTime: "2025-07-02 08:00",
destinationTime: "2025-07-03 14:00",
containers: 2,
LFD: "2025-07-05",

customer: "Coca Cola Mexico",
origin: "Manzanillo",
destination: "Monterrey",
truck: "TRK-442",
driver: "Carlos Mendoza",
progress: 65,
status: "in_transit",

planning:{
loadAssignmentDate:"2025-07-01",
tripNumber:"TRP-001",
customer:"Coca Cola Mexico",
route:"Manzanillo → Monterrey",
tripType:"Round Trip",
trailerMode:"Double",
trailerType:"Container",
pickupAddress:"Terminal Portuaria Manzanillo",
pickupDate:"2025-07-02",
pickupHour:"08:00",
deliveryAddress:"Parque Industrial Monterrey",
deliveryDate:"2025-07-03",
deliveryHour:"14:00",
tripEndAddress:"Terminal Portuaria Manzanillo",
tripRegistrationDate:"2025-07-01",
tripDistance:910,
tripPrice:42000
},

loadAssignment:{
businessUnit:"Norte",
carrier:"Internal",
truckNumber:"TRK-442",
driver:"Carlos Mendoza",
tripPriceMXN:42000,
internalTripNumber:"INT-2025-001",
invoiceNumber:"INV-2025-441",
dateOfAssignment:"2025-07-01"
},

expensePreAssignment:{
estimatedDiesel:505,
estimatedDEF:50,
cashTolls:1200,
driverFood:400,
otherExpenses: [
  { description: "Escort Vehicle", amount: 5000 },
  { description: "Parking", amount: 200 }
]
},

driverAcceptance:{
loadAcceptanceDate:"2025-07-01",
loadAcceptanceHour:"15:30",
tripStartDate:"2025-07-02",
tripStartHour:"07:45",
sleepBreakLog:[]
},

loadingData:{
arrivalDate:"2025-07-02",
arrivalHour:"08:15",
containers:[
{containerNumber:"MSKU1234567",sealNumber:"SL-98765",customer:"Coca Cola Mexico",photos:[]},
{containerNumber:"TCKU7654321",sealNumber:"SL-12345",customer:"Coca Cola Mexico",photos:[]}
]
},

monitoring:{
liveGPS:{latitude:22.15,longitude:-102.3},
etaRoute:"2025-07-03T14:00:00",
lastStatusUpdate:"2025-07-02T18:00:00",
statusUpdates:[
{time:"2025-07-02T10:00:00",message:"Departed Manzanillo port."}
],
alerts:[],
retellAiCalls:[]
},

unloading:{deliveryEndDate:"",deliveryEndHour:"",podPhotos:[],tripEndedByDriver:false,driverTripEndDate:"",driverTripEndHour:"",notes:""},

customerExtraCosts:{detentionCharges:0,otherExtraCosts:[]},

containerDelivery:{
deadFreight:false,
lastFreeDay:"2025-07-05",
containerDeliveryDate:"",
containerDeliveryHour:"",
portTerminalName:"SSA Mexico Terminal",
portTerminalLocation:"Manzanillo",
carrier:"Internal",
truckNumber:"TRK-442",
tripEndDate:"",
tripEndHour:""
},

additionalCosts:{localFreightFee:0,localFreightLocation:"",localCarrierName:"",containerHandlingCompany:"",roadServiceCost:0,roadServiceCompany:"",roadServiceDescription:""},

tripExpense:{diesel:490,def:48,tolls:1150,food:380,additionalDriverExpenses:200},

driverWages:{baseWage:3780,imss:280,infonavit:150,taxes:340,driverExtraExpenses:200,finalWage:2810},

settlement:{tripPrice:42000,customerExtraCosts:0,totalTripCosts:8268,totalDriverCosts:2810,netProfit:30922,invoiceGenerated:false,adminApproved:false,taxApplied:16,creditTermsDays:30,dueDate:"",paymentRemindersSent:0},

originLocation:{address:"Manzanillo",latitude:19.07,longitude:-104.32},
destinationLocation:{address:"Monterrey",latitude:25.67,longitude:-100.31},
currentLocation:{address:"Lagos de Moreno",latitude:21.35,longitude:-101.93},

aiCurrentSpeed:85,
aiDistanceRemaining:420,
aiEstimatedArrivalHuman:"Jul 3, 2025 – 2:15 PM",
aiMovementDetected:true,
aiLastUpdated:"2025-07-02T18:00:00",

schedule:{actualStartTime:"2025-07-02T07:45:00"},
destinationDeliveryTime:"2025-07-03T14:00:00"
},

{
id:"2",
tripId:"TRP-002",

tripNumber:"TRP-002",
bookingNumber:"BK-1002",
pickupTime:"2025-07-04 06:00",
destinationTime:"2025-07-06 10:00",
containers:1,
LFD:"2025-07-08",

customer:"Amazon Logistics",
origin:"Guadalajara",
destination:"Tijuana",
truck:"TRK-110",
driver:"Jorge Reyes",
progress:20,
status:"assigned",

planning:{
loadAssignmentDate:"2025-07-02",
tripNumber:"TRP-002",
customer:"Amazon Logistics",
route:"Guadalajara → Tijuana",
tripType:"One Way",
trailerMode:"Single",
trailerType:"Dry Box",
pickupAddress:"Amazon Guadalajara Warehouse",
pickupDate:"2025-07-04",
pickupHour:"06:00",
deliveryAddress:"Amazon Tijuana Center",
deliveryDate:"2025-07-06",
deliveryHour:"10:00",
tripEndAddress:"Amazon Tijuana Center",
tripRegistrationDate:"2025-07-02",
tripDistance:2200,
tripPrice:76000
},

loadAssignment:{businessUnit:"Occidente",carrier:"Internal",truckNumber:"TRK-110",driver:"Jorge Reyes",tripPriceMXN:76000,internalTripNumber:"INT-2025-002",invoiceNumber:"",dateOfAssignment:"2025-07-02"},

expensePreAssignment:{estimatedDiesel:1222,estimatedDEF:90,cashTolls:2800,driverFood:800,otherExpenses: [
  { description: "Escort Vehicle", amount: 5000 },
  { description: "Parking", amount: 200 }
]},

driverAcceptance:{loadAcceptanceDate:"",loadAcceptanceHour:"",tripStartDate:"",tripStartHour:"",sleepBreakLog:[]},

loadingData:{arrivalDate:"",arrivalHour:"",containers:[]},

monitoring:{liveGPS:null,etaRoute:"",lastStatusUpdate:"",statusUpdates:[],alerts:[],retellAiCalls:[]},

unloading:{deliveryEndDate:"",deliveryEndHour:"",podPhotos:[],tripEndedByDriver:false,driverTripEndDate:"",driverTripEndHour:"",notes:""},

customerExtraCosts:{detentionCharges:0,otherExtraCosts:[]},

containerDelivery:{deadFreight:false,lastFreeDay:"2025-07-08",containerDeliveryDate:"",containerDeliveryHour:"",portTerminalName:"",portTerminalLocation:"",carrier:"",truckNumber:"",tripEndDate:"",tripEndHour:""},

additionalCosts:{localFreightFee:0,localFreightLocation:"",localCarrierName:"",containerHandlingCompany:"",roadServiceCost:0,roadServiceCompany:"",roadServiceDescription:""},

tripExpense:{diesel:0,def:0,tolls:0,food:0,additionalDriverExpenses:0},

driverWages:{baseWage:6840,imss:0,infonavit:0,taxes:0,driverExtraExpenses:0,finalWage:0},

settlement:{tripPrice:76000,customerExtraCosts:0,totalTripCosts:0,totalDriverCosts:0,netProfit:0,invoiceGenerated:false,adminApproved:false,taxApplied:16,creditTermsDays:30,dueDate:"",paymentRemindersSent:0},

originLocation:{address:"Guadalajara",latitude:20.66,longitude:-103.34},
destinationLocation:{address:"Tijuana",latitude:32.52,longitude:-117.03},
currentLocation:null,

aiCurrentSpeed:0,
aiDistanceRemaining:2200,
aiEstimatedArrivalHuman:"Pending",
aiMovementDetected:false,
aiLastUpdated:"",

schedule:{actualStartTime:""},
destinationDeliveryTime:"2025-07-06T10:00:00"
},

{
id:"3",
tripId:"TRP-003",

tripNumber:"TRP-003",
bookingNumber:"BK-1003",
pickupTime:"2025-06-26 05:00",
destinationTime:"2025-06-27 11:00",
containers:1,
LFD:"2025-06-30",

customer:"Walmart Mexico",
origin:"CDMX",
destination:"Monterrey",
truck:"TRK-789",
driver:"Luis Herrera",
progress:100,
status:"delivered",

planning:{
loadAssignmentDate:"2025-06-25",
tripNumber:"TRP-003",
customer:"Walmart Mexico",
route:"CDMX → Monterrey",
tripType:"One Way",
trailerMode:"Single",
trailerType:"Platform",
pickupAddress:"CEDIS Walmart Cuautitlán",
pickupDate:"2025-06-26",
pickupHour:"05:00",
deliveryAddress:"CEDIS Walmart Monterrey",
deliveryDate:"2025-06-27",
deliveryHour:"11:00",
tripEndAddress:"CEDIS Walmart Monterrey",
tripRegistrationDate:"2025-06-25",
tripDistance:900,
tripPrice:35000
},

loadAssignment:{businessUnit:"Norte",carrier:"Internal",truckNumber:"TRK-789",driver:"Luis Herrera",tripPriceMXN:35000,internalTripNumber:"INT-2025-003",invoiceNumber:"INV-2025-400",dateOfAssignment:"2025-06-25"},

expensePreAssignment:{estimatedDiesel:500,estimatedDEF:45,cashTolls:1100,driverFood:350,otherExpenses: [
  { description: "Escort Vehicle", amount: 5000 },
  { description: "Parking", amount: 200 }
]},

driverAcceptance:{loadAcceptanceDate:"2025-06-25",loadAcceptanceHour:"16:00",tripStartDate:"2025-06-26",tripStartHour:"05:00",sleepBreakLog:[]},

loadingData:{arrivalDate:"2025-06-26",arrivalHour:"05:30",containers:[{containerNumber:"WLMT9988776",sealNumber:"SL-55678",customer:"Walmart Mexico",photos:[]}]},

monitoring:{liveGPS:null,etaRoute:"2025-06-27T11:00:00",lastStatusUpdate:"2025-06-27T11:00:00",statusUpdates:[{time:"2025-06-27T11:00:00",message:"Delivered successfully."}],alerts:[],retellAiCalls:[]},

unloading:{deliveryEndDate:"2025-06-27",deliveryEndHour:"11:10",podPhotos:["pod1.jpg"],tripEndedByDriver:true,driverTripEndDate:"2025-06-27",driverTripEndHour:"11:30",notes:"Clean delivery."},

customerExtraCosts:{detentionCharges:500,otherExtraCosts:[]},

containerDelivery:{deadFreight:false,lastFreeDay:"2025-06-30",containerDeliveryDate:"2025-06-27",containerDeliveryHour:"11:10",portTerminalName:"CEDIS Walmart",portTerminalLocation:"Monterrey",carrier:"Internal",truckNumber:"TRK-789",tripEndDate:"2025-06-27",tripEndHour:"11:30"},

additionalCosts:{localFreightFee:0,localFreightLocation:"",localCarrierName:"",containerHandlingCompany:"",roadServiceCost:0,roadServiceCompany:"",roadServiceDescription:""},

tripExpense:{diesel:488,def:42,tolls:1080,food:340,additionalDriverExpenses:0},

driverWages:{baseWage:3150,imss:230,infonavit:120,taxes:280,driverExtraExpenses:0,finalWage:2520},

settlement:{tripPrice:35000,customerExtraCosts:800,totalTripCosts:1950,totalDriverCosts:2520,netProfit:31330,invoiceGenerated:true,adminApproved:true,taxApplied:16,creditTermsDays:30,dueDate:"2025-07-27",paymentRemindersSent:1},

originLocation:{address:"CDMX",latitude:19.43,longitude:-99.13},
destinationLocation:{address:"Monterrey",latitude:25.68,longitude:-100.32},
currentLocation:{address:"Monterrey",latitude:25.68,longitude:-100.32},

aiCurrentSpeed:0,
aiDistanceRemaining:0,
aiEstimatedArrivalHuman:"Delivered",
aiMovementDetected:false,
aiLastUpdated:"2025-06-27T11:00:00",

schedule:{actualStartTime:"2025-06-26T05:00:00"},
destinationDeliveryTime:"2025-06-27T11:00:00"
}

];

export type Trip = typeof MOCK_TRIPS[0];