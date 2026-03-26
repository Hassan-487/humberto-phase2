export const MOCK_AGREEMENTS = [

{
id:"AGR-001",
agreementNumber:"AGR-001",

customerId:"CUST-001",
customerName:"Coca Cola Mexico",

originAddress:"Manzanillo Port Terminal",
destinationAddress:"Monterrey Industrial Park",
tripEndAddress:"Manzanillo Port Terminal",

originLocation:{latitude:19.07,longitude:-104.32},
destinationLocation:{latitude:25.67,longitude:-100.31},
tripEndLocation:{latitude:19.07,longitude:-104.32},

tripType:"round_trip",
trailerMode:"double",
trailerType:"container",

tripDistance:910,
tripPrice:42000
},

{
id:"AGR-002",
agreementNumber:"AGR-002",

customerId:"CUST-002",
customerName:"Amazon Logistics",

originAddress:"Guadalajara Warehouse",
destinationAddress:"Tijuana Distribution Center",
tripEndAddress:"Tijuana Distribution Center",

originLocation:{latitude:20.66,longitude:-103.34},
destinationLocation:{latitude:32.52,longitude:-117.03},
tripEndLocation:{latitude:32.52,longitude:-117.03},

tripType:"one_way",
trailerMode:"single",
trailerType:"dry_box",

tripDistance:2200,
tripPrice:76000
},

{
id:"AGR-003",
agreementNumber:"AGR-003",

customerId:"CUST-003",
customerName:"Walmart Mexico",

originAddress:"CDMX CEDIS",
destinationAddress:"Monterrey CEDIS",
tripEndAddress:"Monterrey CEDIS",

originLocation:{latitude:19.43,longitude:-99.13},
destinationLocation:{latitude:25.68,longitude:-100.32},
tripEndLocation:{latitude:25.68,longitude:-100.32},

tripType:"one_way",
trailerMode:"single",
trailerType:"platform",

tripDistance:900,
tripPrice:35000
}

]