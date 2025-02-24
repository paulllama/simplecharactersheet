export const RadioInput = ({ value, onChange, key }: {
    value: string,
    onChange: (value: string) => void,
    key: string,
}) => (
    <input type='radio' 
        name={key} 
        key={key} 
        value={value} 
        onChange={event => onChange(event.target.value)} 
    />
)

export const TextInput = ({ value, onChange, key }: {
    value: string,
    onChange: (value: string) => void,
    key: string,
}) => (
    <input type='text' 
        name={key} 
        key={key} 
        value={value} 
        onChange={event => onChange(event.target.value)} 
    />
)

export const TextareaInput = ({ value, onChange, key }: {
    value: string,
    onChange: (value: string) => void,
    key: string,
}) => (
    <textarea 
        key={key} 
        name={key} 
        value={value} 
        onChange={event => onChange(event.target.value)} 
    />
)

export const CheckboxInput = ({ value, onChange, key }: {
    value: string,
    onChange: (value: boolean) => void,
    key: string,
}) => {
    const toggleValue = () => onChange(!value)

    return (
        <label className={`checkbox ${value && 'checked'}`} key={key} onClick={toggleValue}>
            <input type='checkbox' id={key} name={key} onChange={toggleValue} />
            <span className='icon checkmark' />
        </label>

    )
}