

export default function GenrePicker(props) {
    
    return (
        <select 
        multiple id="genre" 
        value={props.value} 
        onChange={props.handleGenreChange}>
        {props.genreOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
        </select>
    )
}