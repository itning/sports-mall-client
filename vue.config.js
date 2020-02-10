// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1890ff',
                    'link-color': '#1890ff',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    }
};
