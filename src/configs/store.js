

export default {
    user: {
        isAuthenticated: false
    },
    points: [],
    prioritization: {
        distanceToTime: 3,
        priceToTime: 1,
        priceToDistance: 1
    },
    settings: {
        takeRating: false,
        radius: 1000,
        takeWorkingHours: false,
        takeRoutePrice: false,
        takePrioritization: false,
        carConsumption: 9,
        fuelCost: 1.8
    },
    routes: {
        selectedRoute: ''
    }
};