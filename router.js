class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
        console.log({ routes });
    }

    loadRoute(...urlSegs) {
        console.log({ ...urlSegs });
        const mathedRoute = this._mathUrlToRoute(urlSegs);
        console.log({ mathedRoute });

        const url = `/${urlSegs.join('/')}`;
        window.history.pushState({}, 'this works', url);

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = mathedRoute.template;
    }

    _mathUrlToRoute(urlSegs) {
        const mathedRoute = this.routes.find((route) => {
            const routePathSegs = route.path.split('/').slice(1);
            console.log({ urlSegs });
            console.log({ route });
            console.log({ routePathSegs });

            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }

            return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i]);
        });

        return mathedRoute;
    }

    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.splice(1) : '';
        console.log({ pathNameSplit });
        console.log({ pathSegs });

        this.loadRoute(...pathSegs);
    }
}
