import { Popover } from '@chakra-ui/react';
import {
  RangeDatepicker as BaseRangeDatePicker,
  RangeDatepickerProps,
} from 'chakra-dayzed-datepicker';
import { format } from 'date-fns';

import useLanguage from '@/hooks/useLanguage';

import { Button, ButtonProps } from '../Button';
import { MdOutlineCalendarToday } from '../Icon';
import {
  getDateFnsLocale,
  getDayNames,
  getDefaultFullDateFormat,
  getMonthNames,
} from '../MonthPicker/constants';

export const RangeDatePicker = ({
  propsConfigs,
  configs,
  usePortal = true,
  ...rest
}: RangeDatepickerProps) => {
  const { language } = useLanguage();
  const dateFormat = configs?.dateFormat ?? getDefaultFullDateFormat(language);
  const dateFnsLocale = getDateFnsLocale(language);

  return (
    <BaseRangeDatePicker
      usePortal={usePortal}
      {...rest}
      configs={{
        monthNames: getMonthNames(language, 'LLLL'),
        dayNames: getDayNames(language),
        ...configs,
        dateFormat,
      }}
      propsConfigs={{
        triggerBtnProps: {
          fontWeight: 'regular',
          color: 'gray.1500',
          fontSize: 'md',
          ...propsConfigs?.triggerBtnProps,
        },
        inputProps: {
          color: 'primary.dark',
          ...propsConfigs?.inputProps,
        },
        popoverCompProps: {
          popoverContentProps: {
            css: {
              '.chakra-button[aria-pressed="true"]': {
                borderRadius: 'full',
              },
              '.chakra-button[aria-pressed="false"]:has(+ .chakra-button[aria-pressed="true"])':
                {
                  borderRightRadius: 'sm',
                },
              '.chakra-button[aria-pressed="true"] + .chakra-button[aria-pressed="false"]':
                {
                  borderLeftRadius: 'sm',
                },
              '.chakra-button[aria-pressed="false"]:nth-child(7n + 1)': {
                borderLeftRadius: 'sm',
              },
              '.chakra-button[aria-pressed="false"]:nth-child(7n)': {
                borderRightRadius: 'sm',
              },
            },
            ...propsConfigs?.popoverCompProps?.popoverContentProps,
          },
          ...propsConfigs?.popoverCompProps,
        },
        calendarPanelProps: {
          wrapperProps: {
            gap: 4,
            border: 'none',
            ...propsConfigs?.calendarPanelProps?.wrapperProps,
          },
          dividerProps: {
            display: 'none',
            ...propsConfigs?.calendarPanelProps?.dividerProps,
          },
          contentProps: {
            px: 6,
            py: 4,
            borderWidth: '1px',
            borderColor: 'primary.extralight',
            borderRadius: 16,
            bg: 'white',
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
          color: 'gray.1000',
          fontSize: 'sm',
          fontWeight: 'regular',
          ...propsConfigs?.weekdayLabelProps,
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            width: 34,
            height: 34,
            color: 'gray.1500',
            fontWeight: 'regular',
            _hover: {
              background: 'primary.extralight',
              ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps?._hover,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.defaultBtnProps,
          },
          todayBtnProps: {
            fontWeight: 'semibold',
            ...propsConfigs?.dayOfMonthBtnProps?.todayBtnProps,
          },
          selectedBtnProps: {
            color: 'white',
            background: 'none',
            fontWeight: 'semibold',
            position: 'relative',
            border: 'none',
            zIndex: 1,
            borderRadius: 0,
            _hover: {
              background: 'none',
            },
            _before: {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'primary.main',
              borderRadius: 'full',
              zIndex: -1,
            },
            ...propsConfigs?.dayOfMonthBtnProps?.selectedBtnProps,
          },
          isInRangeBtnProps: {
            color: 'primary.dark',
            background: 'primary.extralight',
            borderRadius: 'md',
            ...propsConfigs?.dayOfMonthBtnProps?.isInRangeBtnProps,
          },
          ...propsConfigs?.dayOfMonthBtnProps,
        },
        ...propsConfigs,
      }}
    >
      {(selectedDates) => (
        <Popover.Trigger asChild>
          <Button
            pl={2}
            colorPalette="neutral"
            variant="outline"
            {...(propsConfigs?.triggerBtnProps as ButtonProps)}
          >
            <MdOutlineCalendarToday
              color="gray.400"
              style={{ marginInlineEnd: 3 }}
            />
            {selectedDates && selectedDates.length > 0
              ? selectedDates.length === 1
                ? `${format(selectedDates[0], dateFormat, { locale: dateFnsLocale })} - `
                : `${format(selectedDates[0], dateFormat, { locale: dateFnsLocale })} - ${format(selectedDates[1], dateFormat, { locale: dateFnsLocale })}`
              : ''}
          </Button>
        </Popover.Trigger>
      )}
    </BaseRangeDatePicker>
  );
};
