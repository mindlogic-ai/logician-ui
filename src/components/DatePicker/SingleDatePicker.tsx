import {
  SingleDatepicker,
  SingleDatepickerProps,
} from 'chakra-dayzed-datepicker';
import { format } from 'date-fns';

import useLanguage from '@/hooks/useLanguage';

import {
  getDateFnsLocale,
  getDayNames,
  getDefaultFullDateFormat,
  getMonthNames,
} from '../MonthPicker/constants';
import type { DatePickerSizeProps } from './DatePicker.types';
import { DatePickerTrigger } from './DatePickerTrigger';

export const SingleDatePicker = ({
  propsConfigs,
  configs,
  usePortal = true,
  size,
  ...rest
}: SingleDatepickerProps & DatePickerSizeProps) => {
  const { language } = useLanguage();
  const dateFormat = configs?.dateFormat ?? getDefaultFullDateFormat(language);
  const dateFnsLocale = getDateFnsLocale(language);

  return (
    <SingleDatepicker
      usePortal={usePortal}
      {...rest}
      configs={{
        monthNames: getMonthNames(language, 'LLLL'),
        dayNames: getDayNames(language),
        ...configs,
        dateFormat,
      }}
      propsConfigs={{
        inputProps: {
          color: 'fg.default',
          ...propsConfigs?.inputProps,
        },
        popoverCompProps: {
          popoverContentProps: {
            boxShadow: 'lg',
            ...propsConfigs?.popoverCompProps?.popoverContentProps,
          },
          ...propsConfigs?.popoverCompProps,
        },
        calendarPanelProps: {
          wrapperProps: {
            gap: 4,
            ...propsConfigs?.calendarPanelProps?.wrapperProps,
          },
          dividerProps: {
            display: 'none',
            ...propsConfigs?.calendarPanelProps?.dividerProps,
          },
          contentProps: {
            borderWidth: 0,
            p: 4,
            ...propsConfigs?.calendarPanelProps?.contentProps,
          },
          bodyProps: {
            gap: 0,
            rowGap: 1,
            ...propsConfigs?.calendarPanelProps?.bodyProps,
          },
          ...propsConfigs?.calendarPanelProps,
        },
        dateNavBtnProps: {
          color: 'primary.main',
          ...propsConfigs?.dateNavBtnProps,
        },
        weekdayLabelProps: {
          mb: 2,
          color: 'fg.muted',
          fontWeight: 'regular',
          ...propsConfigs?.weekdayLabelProps,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: 34,
            height: 34,
            color: 'fg.default',
            fontSize: 'sm',
            fontWeight: 'regular',
            _hover: {
              background: 'primary.wash',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          todayBtnProps: {
            fontWeight: 'semibold',
            boxShadow: 'inset 0 0 0 1px var(--chakra-colors-border-strong)',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'fg.onPrimary',
            border: 'none',
            background: 'primary.main',
            borderRadius: 'full',
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    >
      {(selectedDate) => (
        <DatePickerTrigger
          size={size}
          disabled={rest.disabled}
          triggerProps={propsConfigs?.triggerBtnProps}
        >
          {selectedDate
            ? format(selectedDate, dateFormat, { locale: dateFnsLocale })
            : ''}
        </DatePickerTrigger>
      )}
    </SingleDatepicker>
  );
};
