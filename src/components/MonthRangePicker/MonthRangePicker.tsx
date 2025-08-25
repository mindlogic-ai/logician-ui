'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { format, isAfter, isSameMonth } from 'date-fns';

import { Text } from '@/components/Typography';
import useLocale from '@/hooks/useLocale';
import { useTranslate } from '@/hooks/useTranslate';

import { Icon } from '../Icon';
import { hasEnabledMonthsInYear, isMonthDisabled } from './_utils';
import {
  getDateFnsLocale,
  getDefaultDateFormat,
  getMonthNames,
} from './constants';
import { MonthButton } from './MonthButton/MonthButton';
import { MonthRange, MonthRangePickerProps } from './MonthRangePicker.types';

export const MonthRangePicker: React.FC<MonthRangePickerProps> = ({
  selectedRange,
  singleMonth = false,
  onChange,
  minMonth,
  maxMonth,
  disabled = false,
  placeholder,
  format: dateFormat, // Remove default here, will be set dynamically
  usePortal = true,
  popoverProps,
  name,
  ...boxProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { language: locale } = useLocale();
  const translate = useTranslate();

  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getFullYear(),
  );
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<{
    month: number;
    year: number;
  } | null>(null);

  // Get localized month names, date-fns locale, and default format
  const monthNames = useMemo(() => getMonthNames(locale), [locale]);
  const dateFnsLocale = useMemo(() => getDateFnsLocale(locale), [locale]);
  const effectiveDateFormat = useMemo(
    () => dateFormat || getDefaultDateFormat(locale),
    [dateFormat, locale],
  );

  // Use translated placeholder if not provided
  const effectivePlaceholder =
    placeholder || (translate('month_range_placeholder') as string);

  const displayValue = useMemo(() => {
    // If we have a complete range, show start - end
    if (selectedRange?.endMonth) {
      const start = format(selectedRange.startMonth, effectiveDateFormat, {
        locale: dateFnsLocale,
      });
      const end = format(selectedRange.endMonth, effectiveDateFormat, {
        locale: dateFnsLocale,
      });
      return `${start} - ${end}`;
    }

    // If we have a partial range (selectedRange with only startMonth) or selection start
    if (selectedRange?.startMonth || selectionStart) {
      const startDate = selectedRange?.startMonth || selectionStart;
      if (startDate) {
        const start = format(startDate, effectiveDateFormat, {
          locale: dateFnsLocale,
        });
        // In single month mode, show just the month without dash
        return singleMonth ? start : `${start} -`;
      }
    }

    // No selection at all
    return '';
  }, [
    selectedRange,
    selectionStart,
    effectiveDateFormat,
    dateFnsLocale,
    singleMonth,
  ]);

  // Check if navigation to previous/next year is possible
  const canNavigateToPrevYear = useMemo(() => {
    return hasEnabledMonthsInYear(currentYear - 1, minMonth, maxMonth);
  }, [currentYear, minMonth, maxMonth]);

  const canNavigateToNextYear = useMemo(() => {
    return hasEnabledMonthsInYear(currentYear + 1, minMonth, maxMonth);
  }, [currentYear, minMonth, maxMonth]);

  const handleYearChange = useCallback(
    (direction: 'prev' | 'next') => {
      const targetYear =
        direction === 'prev' ? currentYear - 1 : currentYear + 1;

      // Only navigate if the target year has enabled months
      if (hasEnabledMonthsInYear(targetYear, minMonth, maxMonth)) {
        setCurrentYear(targetYear);
        // Keep selectionStart to allow cross-year range selection
      }
    },
    [currentYear, minMonth, maxMonth],
  );

  const handleMonthClick = useCallback(
    (month: number, year: number) => {
      if (isMonthDisabled(month, year, minMonth, maxMonth)) return;

      const clickedMonth = new Date(year, month, 1);

      // Single month mode: immediate selection and close
      if (singleMonth) {
        onChange?.({
          startMonth: clickedMonth,
          endMonth: null,
        });
        setSelectionStart(null);
        onClose();
        return;
      }

      // Range mode: existing logic
      if (!selectionStart) {
        // If there's an existing complete range, clear it and start fresh
        if (selectedRange) {
          onChange?.(null);
        }
        // Start new selection and notify parent with partial range
        setSelectionStart(clickedMonth);
        // Call onChange with partial range to update parent state
        onChange?.({ startMonth: clickedMonth, endMonth: null });
      } else {
        // Complete the selection
        const startMonth = selectionStart;
        const endMonth = clickedMonth;

        if (isSameMonth(startMonth, endMonth)) {
          // Same month selected, create single-month range
          onChange?.({
            startMonth,
            endMonth,
          });
        } else {
          // Different months, ensure proper order
          const range: MonthRange = isAfter(startMonth, endMonth)
            ? { startMonth: endMonth, endMonth: startMonth }
            : { startMonth, endMonth };

          onChange?.(range);
        }

        setSelectionStart(null);
        onClose();
      }
    },
    [
      singleMonth,
      selectionStart,
      selectedRange,
      onChange,
      onClose,
      minMonth,
      maxMonth,
    ],
  );

  const handleMonthHover = useCallback((month: number, year: number) => {
    setHoveredMonth({ month, year });
  }, []);

  const handleMonthHoverLeave = useCallback(() => {
    setHoveredMonth(null);
  }, []);

  const handleClear = useCallback(() => {
    onChange?.(null);
    setSelectionStart(null);
  }, [onChange]);

  const popoverContent = (
    <PopoverContent width="320px">
      <PopoverBody>
        <VStack spacing={4} align="stretch">
          {/* Year Navigation */}
          <HStack justify="space-between" align="center">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleYearChange('prev')}
              disabled={!canNavigateToPrevYear}
              opacity={!canNavigateToPrevYear ? 0.4 : 1}
            >
              <Icon icon="IoIosArrowBack" />
            </Button>

            <Text fontWeight="semibold" fontSize="lg">
              {currentYear}
            </Text>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleYearChange('next')}
              disabled={!canNavigateToNextYear}
              opacity={!canNavigateToNextYear ? 0.4 : 1}
            >
              <Icon icon="IoChevronForward" />
            </Button>
          </HStack>

          {/* Months Grid */}
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {monthNames.map((monthName, monthIndex) => (
              <MonthButton
                key={monthIndex}
                month={monthIndex}
                year={currentYear}
                monthName={monthName}
                selectedRange={selectedRange}
                selectionStart={selectionStart}
                hoveredMonth={hoveredMonth}
                minMonth={minMonth}
                maxMonth={maxMonth}
                onClick={handleMonthClick}
                onMouseEnter={handleMonthHover}
                onMouseLeave={handleMonthHoverLeave}
              />
            ))}
          </Grid>

          {/* Action Buttons */}
          <HStack spacing={2} justify="flex-end">
            <Button size="sm" variant="ghost" onClick={handleClear}>
              {translate('clear')}
            </Button>
          </HStack>
        </VStack>
      </PopoverBody>
    </PopoverContent>
  );

  return (
    <Box {...boxProps}>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        {...popoverProps}
      >
        <PopoverTrigger>
          <InputGroup>
            <InputLeftElement>
              <Icon
                icon="MdOutlineCalendarToday"
                boxSize="xs"
                color="gray.800"
              />
            </InputLeftElement>
            <Input
              name={name}
              value={displayValue}
              placeholder={effectivePlaceholder}
              readOnly
              disabled={disabled}
              cursor={disabled ? 'not-allowed' : 'pointer'}
              onClick={disabled ? undefined : onOpen}
            />
          </InputGroup>
        </PopoverTrigger>
        {usePortal ? <Portal>{popoverContent}</Portal> : popoverContent}
      </Popover>
    </Box>
  );
};
