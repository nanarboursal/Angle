import React, {useState} from 'react';

const Autocomplete = ({data, clickAction}) => {

    const [suggest, setSuggest] = useState([]);

    const onHandleChange = (e) => {
        const input = e.target.value;
        if(input.length === 0){
            setSuggest([]);
        }else {
            const regex = new RegExp(`^${input}`, 'i');
            setSuggest(data.sort().filter(v => regex.test(v.name))) 
        }
    }

    const renderSuggestion = () => {
        if(suggest.length === 0){
            return null;
        }
        return(
            <ul>
                { suggest.map((item) => <li onClick={clickAction}>{item.name}</li>) }
            </ul>
        )
    }

    return (
        <div>
            <input onChange={onHandleChange} type="text"/>
            {renderSuggestion}
        </div>
    )
}

export default Autocomplete;