exports.REQUEST_FOR_PROVIDER_ALL_REQUESTS = {
  author: 1,
  status: 1,
  maxPrice: 1,
  wasInsuredOneYearAgo: 1,
  wasInsuredTwoYearsAgo: 1,
  type: 1,
  activeTime: 1,
  startDate: 1,
  insuranceDuration: 1,
  assetDescription: 1,
  createdAt: 1,
  policy: 1,
  extraFiles: 1,
};

exports.USER_FOR_USER = {
  username: 1,
  type: 1,
  email: 1,
  _id: 1,
  lastLogin: 1,
}

exports.OFFER_FOR_PROVIDER = {
  price: 1,
  provider: 1
}

exports.CLIENT_FOT_PROVIDER = {
  name: 1,
  companyId: 1,
  address: 1,
  phoneNumber: 1,
  owner: 1,
  fieldOfActivity: 1
}

