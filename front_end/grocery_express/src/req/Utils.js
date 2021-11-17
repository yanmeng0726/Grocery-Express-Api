import {getRequest} from './req'

export function getTempFolder() {
    return getRequest('/api/servermanagement/tempfolder');
}