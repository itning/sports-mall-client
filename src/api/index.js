export const SERVER_HOST = "http://localhost:8888";
export const API = {
  user: {
    login: `${SERVER_HOST}/login`,
    modify: `${SERVER_HOST}/user`
  },
  commodityType: {
    all: `${SERVER_HOST}/commodity_types`
  },
  commodity: {
    type: `${SERVER_HOST}/commodity/type`,
    recommend: `${SERVER_HOST}/commodity/recommends`,
    one: `${SERVER_HOST}/commodity/one/`,
    commodityDetail: `${SERVER_HOST}/commodityDetail/`
  },
  comment: {
    all: `${SERVER_HOST}/comment/`
  },
  cart: {
    add: `${SERVER_HOST}/cart`,
    all: `${SERVER_HOST}/carts`
  },
  order: {
    all: `${SERVER_HOST}/orders`
  }
};
