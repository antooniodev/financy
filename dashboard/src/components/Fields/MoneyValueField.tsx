import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CurrencyInput from 'react-currency-input-field'
import { ContainerField, ErrorMessage } from './styles'

type Props = {
  label: string
  inputName: string
  defaultValue?: number
  placeholder: string
}

const MoneyValueField = ({
  label,
  inputName,
  defaultValue,
  placeholder,
}: Props) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(inputName, defaultValue)
    }
  }, [defaultValue, inputName, setValue])

  return (
    <ContainerField>
      <label htmlFor={inputName}>{label}</label>
      <Controller
        control={control}
        name={inputName}
        defaultValue={defaultValue || 0}
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            id={inputName}
            placeholder={placeholder}
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            value={value}
            onValueChange={val => {
              const formattedValue = Number(val?.replace(',', '.')) || 0
              onChange(formattedValue)
            }}
          />
        )}
      />
      {errors[inputName] && (
        <ErrorMessage>{errors[inputName]?.message?.toString()}</ErrorMessage>
      )}
    </ContainerField>
  )
}

export default MoneyValueField
