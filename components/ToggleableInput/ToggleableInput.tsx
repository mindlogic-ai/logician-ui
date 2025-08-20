import { useState } from 'react';
import { Box, Switch } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import { Textarea } from '@/components/Textarea';

export const ToggleableInput = ({ field }) => {
  const { values } = useFormikContext();

  const [isOpen, setIsOpen] = useState<boolean>(values[field.name]);
  const handleChange = event => {
    setIsOpen(event.target.checked);
  };

  return (
    <Box>
      <Switch
        // TODO: customizing switch color
        colorScheme="blue"
        isChecked={isOpen}
        onChange={handleChange}
      />
      {isOpen && (
        <Box mt={3}>
          <Textarea field={field} />
        </Box>
      )}
    </Box>
  );
};
