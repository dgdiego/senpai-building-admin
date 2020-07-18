const router = require('express').Router();
const React = require('react');
const {StaticRouter} = require('react-router-dom');
const {renderToString} = require('react-dom/server');
const Task = require('../../../models/task');
const View = require('./view');

// https://www.digitalocean.com/community/tutorials/react-react-router-ssr

router.get('/*', (req, res, next) => {

    const initialState = {};
    const context = {};

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <View initialState={initialState}/>
        </StaticRouter>
    );

    res.render('template', {
        pageName: 'to-do-list',
        pageTitle: 'TO-DO List',
        host: 'http://localhost:3000',
        initialState,
        content
    });
});

module.exports = router;
