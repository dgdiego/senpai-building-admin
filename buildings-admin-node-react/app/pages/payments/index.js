const router = require('express').Router();
const React = require('react');
const {StaticRouter} = require('react-router-dom');
const {renderToString} = require('react-dom/server');
const View = require('./view');

// https://www.digitalocean.com/community/tutorials/react-react-router-ssr

router.get('/*', (req, res, next) => {
    const user = req.session.user;
    var initialState = {
        currentUser: {...user}
    };
    const context = {};

    if(req.query.building){
        initialState = {
            ...initialState,
            building: req.query.building
        }
    }

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <View initialState={initialState}/>
        </StaticRouter>
    );

    res.render('template', {
        pageName: 'payments',
        pageTitle: 'Payments',
        host: 'http://localhost:3000',
        initialState,
        content
    });
});

module.exports = router;
