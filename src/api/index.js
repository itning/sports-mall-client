export const SERVER_HOST = "http://localhost:8888";
export const API = {
  user: {
    login: `${SERVER_HOST}/login`,
    modify: `${SERVER_HOST}/user`,
    reg: `${SERVER_HOST}/reg`,
    pwd: `${SERVER_HOST}/pwd`
  },
  commodityType: {
    all: `${SERVER_HOST}/commodity_types`,
    modify: `${SERVER_HOST}/commodity_type`,
    del: `${SERVER_HOST}/commodity_type/`,
    add: `${SERVER_HOST}/commodity_type`
  },
  commodity: {
    type: `${SERVER_HOST}/commodity/type`,
    recommend: `${SERVER_HOST}/commodity/recommends`,
    one: `${SERVER_HOST}/commodity/one/`,
    commodityDetail: `${SERVER_HOST}/commodityDetail/`,
    search: `${SERVER_HOST}/commodity/search/`,
    admin_all: `${SERVER_HOST}/commodity/admin`,
    admin_modify: `${SERVER_HOST}/commodity/admin`,
    admin_modify_detail: `${SERVER_HOST}/commodityDetail`,
    admin_add: `${SERVER_HOST}/commodity/admin`
  },
  comment: {
    all: `${SERVER_HOST}/comment/`,
    add: `${SERVER_HOST}/comment`
  },
  cart: {
    add: `${SERVER_HOST}/cart`,
    all: `${SERVER_HOST}/carts`,
    del: `${SERVER_HOST}/cart/`
  },
  order: {
    all: `${SERVER_HOST}/orders`,
    del: `${SERVER_HOST}/order/`,
    pay: `${SERVER_HOST}/order/pay`,
    hip: `${SERVER_HOST}/order/hip`,
    receipt: `${SERVER_HOST}/order/receipt`,
    add: `${SERVER_HOST}/order`,
    admin_all: `${SERVER_HOST}/orders/admin`,
    admin_modify_price: `${SERVER_HOST}/order/price`
  },
  carousel: {
    all: `${SERVER_HOST}/carousels`,
    add: `${SERVER_HOST}/carousel`,
    del: `${SERVER_HOST}/carousel/`,
    modify: `${SERVER_HOST}/carousel`
  }
};
