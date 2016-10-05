export const TOGGLE_HOME_COUNTRY = 'TOGGLE_HOME_COUNTRY'; 

export function toggleHomeCountry(id){
	return{
		type: TOGGLE_HOME_COUNTRY,
		id
	}
}