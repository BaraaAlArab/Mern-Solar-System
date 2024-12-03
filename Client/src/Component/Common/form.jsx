import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            required
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      case "select":
        return (
          <Select
            placeholder={getControlItem.label}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          >
            {getControlItem.options?.map((optionItem) => (
              <option key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </option>
            ))}
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing={4} align="stretch">
        {formControls.map((controlItem) => (
          <FormControl key={controlItem.name}>
            <FormLabel htmlFor={controlItem.name}>
              {controlItem.label}
            </FormLabel>
            {renderInputsByComponentType(controlItem)}
          </FormControl>
        ))}
        <Box>
          <Button
            colorScheme="blue"
            isFullWidth
            isDisabled={isBtnDisabled}
            type="submit"
          >
            {buttonText || "Submit"}
          </Button>
        </Box>
      </VStack>
    </form>
  );
}
