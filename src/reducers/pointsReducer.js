import { store } from '../configs/index';


/*

    DRIVING
    WALKING
    BICYCLING
    INF

*/
const pointsReducer = (points = store.points, action) => {
    if (action.type === 'ADD_POINT') {
        let tempPoints = [ ...points ];
        let nextPointId = tempPoints.length;

        if (points.length !== 0) {
            nextPointId = points[points.length - 1].id
        }

        tempPoints.forEach(point => {
            point.anotherPoints = [
                ...point.anotherPoints, {
                    id: nextPointId + 1,
                    variant: 'DRIVING'
                }
            ]
        });
        return [
            ...tempPoints,
            {
                ...action.data,
                id: nextPointId + 1,
                isStartingPoint: tempPoints.length === 0,
                anotherPoints: tempPoints.map((point, idnex) => {
                    return {
                        id: point.id,
                        variant: 'DRIVING'
                    }
                }),
                spendTime: 60
            }
        ];
    } else if (action.type === 'REMOVE_POINT') {
        let newPoints = points.filter(point => {
            return point.id !== action.data.id;
        });
        if (newPoints.length > 0) {
            let isStarted = newPoints.every(point => !point.isStartingPoint);
            if (isStarted) {
                newPoints[0].isStartingPoint = true;
            }
        }
        newPoints.forEach(point => {
            point.anotherPoints = point.anotherPoints.filter(apoint => apoint.id !== action.data.id);
        });
        return newPoints;
    } else if (action.type === 'ADD_GOOGLE_DETAILS') {
        let pointIndex = points.findIndex(point => {
            return point.position.lat === action.data.position.lat || 
                    point.position.lng === action.data.position.lng; 
        });
        points[pointIndex] = {
            ...points[pointIndex],
            googleDetails: action.data.googleDetails
        };
        return points;
    } else if (action.type === 'TOGGLE_START_POINT') {
        let tempPoints = [ ...points ];
        if (!action.data.checked) {
            tempPoints.forEach(point => {
                point.isStartingPoint = false;
            });
            tempPoints[0].isStartingPoint = true;
            return tempPoints;
        } else {
            tempPoints.forEach(point => {
                point.isStartingPoint = false;
            });
            tempPoints[action.data.index].isStartingPoint = true;
            return tempPoints;
        }
    } else if (action.type === 'CHANGE_TRAVEL_MODE') {
        let temp = [ ...points ];
        for (let index = 0; index < temp.length; index++) {
            if (temp[index].id === action.data.pointId) {
                for (let iindex = 0; iindex < temp[index].anotherPoints.length; iindex++) {
                    if (temp[index].anotherPoints[iindex].id === action.data.additionalPointId) {
                        temp[index].anotherPoints[iindex].variant = action.data.variant;
                        break;
                    }
                }
                break;
            }
        }
        return temp;
    } else if (action.type === 'CHANGE_TIME_SPENDING') {
        return points.map(point => {
            if (point.id !== action.data.id) {
                return point;
            } else {
                return {
                    ...point,
                    spendTime: action.data.time
                }
            }
        });
    } else {
        return points;
    }
};

export default pointsReducer;