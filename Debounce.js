/**
 * The Debounce technique allow us to "group" multiple sequential calls 
 * in a single one.
 * Two kinds of debounce: 
 * a. trailing: event triggered when no following input fires after trailing time
 * b. leading(immediate): event triggered at the time first input fired and 
 *    holding the events in the following trailing time
 * 
 * Example: Autocomplete, Ajax after keypress in form
 */