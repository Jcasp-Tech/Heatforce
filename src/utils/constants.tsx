export const TOAST_MESSAGE_DELAY = 5;

export const DEFAULT_TABLE_LIMIT = 10;

export const DEFAULT_TABLE_PAGINATION_OPTIONS = ['10', '20', '30'];

export const GOOGLE_API_KEY = 'AIzaSyAGW_b4vA4fY4EBPVwzDcIsSYDQuQtuuCs';
export const libraries = ['places', 'marker', 'drawing', 'geometry'];
export const REGEX = {
  phone:
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, // eslint-disable-next-line
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, //eslint-disable-next-line
};

export const REGEX_VALIDATION_MESSAGE = {
  phone: '',
  email: 'Invalid email address.',
};

export const acceptedImageTypes: any = '.jpg,.jpeg,.png,.PNG,.JPG,.JPEG';

export const ROLES: any = {
  ADMIN: 'Admin',
};

export const MESSAGES: any = {
  formSubmitSuccess: 'Form submitted successfully.',
};



export const WHATSINCL: any = {
  "solar_panels":"solar_panel_name",
  "optimisers":"optimiser_name",
  "inverters":"inverter_name",
  "battery":"battery_name"
}

//TODO create interface instead of any

export const ROOFDETAILSARRAY: any = [
  {
    id: undefined,
    index: 1,
    draw_points: null,
    roofShading: null,
    roof_pitch: null,
    roof_direction: null,
    suggested_roof_area: null,
    suggested_panel: null,
  },
  {
    id: undefined,
    index: 2,
    draw_points: null,
    roofShading: null,
    roof_pitch: null,
    roof_direction: null,
    suggested_roof_area: null,
    suggested_panel: null,
  },
  {
    id: undefined,
    index: 3,
    draw_points: null,
    roofShading: null,
    roof_pitch: null,
    roof_direction: null,
    suggested_roof_area: null,
    suggested_panel: null,
  },
]

export const DEFAULTDATA: any = {
  ownership: '',
  property: '',
  floors: 0,
  bedrooms: 0,
  occupants: 0,
  energy_routine: '',
  gMap: '',
  roof_pitch: '',
  roofShading: null,
  roof_direction: '',
  postalCode: '',
  pinLocation: '',
  energy_usage: null,
  no_energy_usage: '',
  annual_energy_usage: 0,
  roof_space: 0,
  location: '',
  drawAround:'',
  roofArea: '',
  lead_status: 'DRAFT',
}

export const QUESTION: any = [
  {
    id: 'weCantHelp',
    qhead: `Sorry, we can't help.`,
    qtxt: '',
    opt: ['Thank you for your interest. At this time, our services are tailored exclusively for homeowners. If you have any questions or need assistance, please feel free to contact us.','We can only offer solar installations to home owners.'],
    optVal: [''],
    setValue:'',
  },
  {
    id: 'oneOwnership',
    qhead: 'Your Property',
    qtxt: 'Are you the owner or a tenant?',
    opt: ['Owner', 'Tenant'],
    optVal: ['owner', 'tenant'],
    setValue: 'ownership',
  },
  {
    id: 'twoPropertyType',
    qhead: 'Your Property type',
    qtxt: 'What type of property do you have?',
    opt: ['Detached', 'Terraced', 'Semi-Detached', 'Bungalow', 'Flat'],
    optVal: ['detached', 'terraced', 'semidetached', 'bungalow', 'flat'],
    setValue:'property',
  },
  {
    id: 'threePropertySize',
    qhead: 'Number of floors',
    qtxt: 'How many floors is your home spread across?',
    opt: ['One', 'Two', 'Three', 'Four+'],
    optVal: [1, 2, 3, 4],
    setValue:'floors',
  }, {
    id: 'fourBedrooms',
    qhead: 'Bedrooms',
    qtxt: 'How many bedrooms does your home have?',
    // opt2: [
    //   {
    //     key: 1,
    //     text: 'One'
    //   },
    //   {
    //     id: 2,
    //     text: 'Two'
    //   },
    // ],
    opt: ['One', 'Two', 'Three', 'Four', 'Five+'],
    optVal: [1, 2, 3, 4, 5],
    setValue:'bedrooms',
  }, {
    id: 'fiveOccupants',
    qhead: 'Occupants',
    qtxt: 'How many people live in your home?',
    opt: ['One', 'Two', 'Three', 'Four+'],
    optVal: [1, 2, 3, 4],
    setValue:'occupants',
  }, {
    id: 'sixEnergyUsage',
    qhead: 'Energy Usage',
    qtxt: 'When do you typically use electricity in property?',
    opt: ['Most of the day', 'Morning & Evening'],
    optVal: ['most_of_the_day', 'morning_evening'],
    setValue:'energy_routine',
  }, {
    id: 'sevenEnergyConsumption',
    qhead: 'Energy consumption',
    qtxt: 'Do your know your annual energy consumption in KWh?',
    opt: ['Yes', 'No'],
    optVal: [1, 0],
    setValue:'energy_usage',
  }, {
    id: 'eightInputForm',
    qhead: 'Enter energy consumption',
    qtxt: '',
    opt: [],
    optVal: [],
    setValue:'annual_energy_usage',
  }, {
    id: 'nineEnergyConsumption',
    qhead: 'Energy Consumption',
    qtxt: 'Do your know your annual energy consumption in KWh?',
    opt: ['Low/Careful', 'Average', 'High/use a lot'],
    optVal: ['low','fairly','high'],
    setValue:'no_energy_usage',
  }, {
    id: 'webLeadType',
    qhead: 'What are you looking for?',
    qtxt: 'Do you already have solar panels?',
    opt: ['I am looking for solar & battery', "I have panels, looking for a battery"],
    optVal: [1, 2],
    setValue: 'web_lead_type',
  }, {
    id: 'solarSystem',
    qhead: 'What size solar system do you currently have?',
    qtxt: 'Please type the closest figure below.',
    qtxt2: '(For example 3 KW, 4 KW, 6 KW)',
    opt: [],
    optVal: [],
    setValue: 'solar_system_size',
  },{
    id: 'tenRoofSpace',
    qhead: 'Available roof space',
    qtxt: 'How many sides of your roof would you like solar installed?',
    opt: ['One', 'Two', 'Three'],
    optVal: [1, 2, 3],
    setValue:'roof_space',
  },{
    id: 'elevenYourLocation',
    qhead: 'Your Location',
    qtxt: 'Search and select your address',
    opt: [],
    optVal: [],
    setValue:'',
  }, {
    id: 'twelvePinLocation',
    qhead: 'Pin your location',
    qtxt: 'Drag the map to the centre of your roof and click Next',
    opt: [],
    optVal: [],
    setValue:'',
  }, {
    id: 'thirteenDrawAroundRoof',
    qhead: 'Draw around your roof',
    qtxt: 'Draw around the area you want to have panels installed',
    opt: ['Click the pointer to your first corner',
'Click the pointer to your second corner of your roof.',
'Complete all four points to get your solar esstimate'],
opt2:[
  "Tap once on any corner of your roof to start",
"Tap the second corner of your roof",
"Complete all four points to get your solar estimate"
],
    optVal: ['/images/mapdraw1.webp','/images/mapdraw2.webp','/images/mapdraw3.webp'],
    setValue:'',
  },{
    id: 'fourteenDrawMap',
    qhead: 'Click on a corner of your roof to begin',
    qtxt: 'Draw around the area you want to have panels installed.',
    qtxt1: 'Draw around the area your panels have been installed.',
    opt: [],
    optVal: [],
    setValue:'',
  },
  {
    id: 'fifteenRoofPitch',
    qhead: 'Roof Pitch',
    qtxt: 'How Steep is the roof in this area?',
    opt: ['Average',  'Flat'],
    optVal: ['average',  'flat'],
    setValue:'roof_pitch',
  }, {
    id: 'sixteenRoofShading',
    qhead: 'Roof Shading',
    qtxt: 'Do any building or trees cast a shadow on this roof?',
    opt: ['Yes', 'No'],
    optVal: [1, 0],
    setValue:'roofShading',
  }, {
    id: 'seventeenRoofDirection',
    qhead: 'Roof direction',
    qtxt: 'Select the direction of this roof area point towards.',
    opt: [],
    optVal: [],
    setValue:'',
  },{
    id: 'eighteenFantastic',
    qhead: 'Fantastic!',
    qtxt: 'It looks like this roof is ready for a solar',
    qtxt1: 'It looks like your home is ready for a battery',
    opt: [],
    optVal: [],
    setValue:'',
  },
]
