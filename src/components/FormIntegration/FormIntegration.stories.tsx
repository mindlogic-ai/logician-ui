import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Field, Box, Flex, Stack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button } from '../Button';
import { FormLabel } from '../FormLabel';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';
import { FileInput } from '../FileInput';
import { Radio } from '../Radio';
import { RadioGroup } from '../Radio/RadioGroup';
import { Slider } from '../Slider';
import { SliderControl } from '../Slider/SliderControl';
import { SliderTrack } from '../Slider/SliderTrack';
import { SliderFilledTrack } from '../Slider/SliderFilledTrack';
import { SliderThumb } from '../Slider/SliderThumb';
import { useToast } from '../Toast';
import { Text } from '../Typography';

const meta: Meta = {
  title: 'Examples/Form Integration',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

// Form 값 타입 정의
interface FormValues {
  name: string;
  email: string;
  bio: string;
  country: { value: string; label: string } | null;
  gender: string;
  experience: number;
  files: FileList | null;
}

// 국가 옵션
const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
];

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, '이름은 최소 2글자 이상이어야 합니다')
    .required('이름은 필수입니다'),
  email: Yup.string()
    .email('올바른 이메일 형식이 아닙니다')
    .required('이메일은 필수입니다'),
  bio: Yup.string()
    .min(10, '자기소개는 최소 10글자 이상이어야 합니다')
    .max(200, '자기소개는 최대 200글자까지 가능합니다')
    .required('자기소개는 필수입니다'),
  country: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .nullable()
    .required('국가를 선택해주세요'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], '성별을 선택해주세요')
    .required('성별은 필수입니다'),
  experience: Yup.number()
    .min(0, '경력은 0년 이상이어야 합니다')
    .max(50, '경력은 50년 이하여야 합니다')
    .required('경력은 필수입니다'),
  files: Yup.mixed<FileList | null>()
    .test('required', '파일 업로드는 필수입니다', (value) => {
      return value !== null && value.length > 0;
    })
    .required('파일 업로드는 필수입니다'),
});

// Formik Form Story
export const FormikFormExample: StoryObj = {
  render: () => {
    const pushToast = useToast();

    const initialValues: FormValues = {
      name: '',
      email: '',
      bio: '',
      country: null,
      gender: '',
      experience: 0,
      files: null,
    };

    const handleSubmit = async (
      values: FormValues,
      { setSubmitting, setFieldError }: FormikHelpers<FormValues>
    ) => {
      try {
        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 랜덤 에러 시뮬레이션 (30% 확률)
        if (Math.random() < 0.3) {
          throw new Error('서버 오류가 발생했습니다');
        }

        // 성공 - 콘솔에 제출 데이터 표시
        console.group('✅ Form 제출 성공 (Formik)');
        console.log('📋 제출된 데이터:', values);
        console.log('👤 이름:', values.name);
        console.log('📧 이메일:', values.email);
        console.log('📝 자기소개:', values.bio);
        console.log('🌍 국가:', values.country?.label);
        console.log('👫 성별:', values.gender);
        console.log('💼 경력:', `${values.experience}년`);
        console.log(
          '📎 파일:',
          values.files ? `${values.files.length}개` : '없음'
        );
        console.groupEnd();

        // Toast 알림
        pushToast({
          status: 'success',
          title: '제출 성공',
          description: `${values.name}님의 정보가 성공적으로 제출되었습니다. 콘솔을 확인하세요.`,
        });
      } catch (error) {
        // 에러 처리 - 콘솔에 에러 표시
        console.group('❌ Form 제출 실패 (Formik)');
        console.error('에러:', error);
        console.log('제출 시도한 데이터:', values);
        console.groupEnd();

        pushToast({
          status: 'error',
          title: '제출 실패',
          description:
            error instanceof Error
              ? error.message
              : '알 수 없는 오류가 발생했습니다',
        });

        // 필드별 에러 설정 예시
        if (error instanceof Error && error.message.includes('이메일')) {
          setFieldError('email', '이미 사용 중인 이메일입니다');
        }
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Box maxW="600px" w="100%" p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Formik Form 예제
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form noValidate>
              <Stack gap={4}>
                {/* Name Input */}
                <Field.Root required invalid={!!(touched.name && errors.name)}>
                  <FormLabel>
                    이름 <Field.RequiredIndicator />
                  </FormLabel>
                  <Input
                    name="name"
                    placeholder="이름을 입력하세요"
                    value={values.name}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                    trimWhiteSpace
                  />
                  <Field.ErrorText>
                    {touched.name && errors.name}
                  </Field.ErrorText>
                </Field.Root>

                {/* Email Input */}
                <Field.Root
                  required
                  invalid={!!(touched.email && errors.email)}
                >
                  <FormLabel>
                    이메일 <Field.RequiredIndicator />
                  </FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    noSpaces
                  />
                  <Field.ErrorText>
                    {touched.email && errors.email}
                  </Field.ErrorText>
                </Field.Root>

                {/* Bio Textarea */}
                <Field.Root required invalid={!!(touched.bio && errors.bio)}>
                  <FormLabel>
                    자기소개 <Field.RequiredIndicator />
                  </FormLabel>
                  <Textarea
                    name="bio"
                    placeholder="자기소개를 입력하세요 (10-200자)"
                    value={values.bio}
                    onChange={(e) => setFieldValue('bio', e.target.value)}
                    rows={4}
                  />
                  <Field.HelperText>{values.bio.length}/200자</Field.HelperText>
                  <Field.ErrorText>{touched.bio && errors.bio}</Field.ErrorText>
                </Field.Root>

                {/* Country Select */}
                <Field.Root
                  required
                  invalid={!!(touched.country && errors.country)}
                >
                  <FormLabel>
                    국가 <Field.RequiredIndicator />
                  </FormLabel>
                  <Select
                    name="country"
                    options={countryOptions}
                    value={values.country}
                    onChange={(value) => setFieldValue('country', value)}
                    placeholder="국가를 선택하세요"
                    invalid={!!(touched.country && errors.country)}
                  />
                  <Field.ErrorText>
                    {touched.country &&
                      typeof errors.country === 'string' &&
                      errors.country}
                  </Field.ErrorText>
                </Field.Root>

                {/* Gender Radio */}
                <Field.Root
                  required
                  invalid={!!(touched.gender && errors.gender)}
                >
                  <FormLabel>
                    성별 <Field.RequiredIndicator />
                  </FormLabel>
                  <RadioGroup
                    value={values.gender}
                    onValueChange={(details) =>
                      setFieldValue('gender', details.value)
                    }
                  >
                    <Flex gap={4}>
                      <Radio value="male">남성</Radio>
                      <Radio value="female">여성</Radio>
                      <Radio value="other">기타</Radio>
                    </Flex>
                  </RadioGroup>
                  <Field.ErrorText>
                    {touched.gender && errors.gender}
                  </Field.ErrorText>
                </Field.Root>

                {/* Experience Slider */}
                <Field.Root
                  required
                  invalid={!!(touched.experience && errors.experience)}
                >
                  <FormLabel>
                    경력 (년) <Field.RequiredIndicator />
                  </FormLabel>
                  <Flex w="100%" gap={4} align="center">
                    <Slider
                      w="100%"
                      value={[values.experience]}
                      onValueChange={(details) =>
                        setFieldValue('experience', details.value[0])
                      }
                      min={0}
                      max={50}
                      step={1}
                    >
                      <SliderControl>
                        <SliderTrack h="1">
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb index={0} />
                      </SliderControl>
                    </Slider>
                    <Text fontWeight="bold" minW="60px" textAlign="right">
                      {values.experience}년
                    </Text>
                  </Flex>
                  <Field.ErrorText>
                    {touched.experience && errors.experience}
                  </Field.ErrorText>
                </Field.Root>

                {/* File Input */}
                <Field.Root
                  required
                  invalid={!!(touched.files && errors.files)}
                >
                  <FormLabel>
                    파일 업로드 <Field.RequiredIndicator />
                  </FormLabel>
                  <FileInput
                    onChange={(files) => setFieldValue('files', files)}
                    multiple
                    accept="image/*,.pdf"
                  />
                  <Field.HelperText>
                    이미지 또는 PDF 파일만 업로드 가능합니다
                  </Field.HelperText>
                  {values.files && values.files.length > 0 && (
                    <Text fontSize="sm" color="gray.600" mt={2}>
                      {values.files.length}개 파일 선택됨
                    </Text>
                  )}
                  <Field.ErrorText>
                    {touched.files &&
                      typeof errors.files === 'string' &&
                      errors.files}
                  </Field.ErrorText>
                </Field.Root>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="solid"
                  w="100%"
                  mt={4}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '제출하기'}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    );
  },
};

// Regular Form Story
export const RegularFormExample: StoryObj = {
  render: () => {
    const pushToast = useToast();

    const [formData, setFormData] = useState<FormValues>({
      name: '',
      email: '',
      bio: '',
      country: null,
      gender: '',
      experience: 0,
      files: null,
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof FormValues, string>>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof FormValues, string>> = {};

      if (!formData.name) {
        newErrors.name = '이름은 필수입니다';
      } else if (formData.name.length < 2) {
        newErrors.name = '이름은 최소 2글자 이상이어야 합니다';
      }

      if (!formData.email) {
        newErrors.email = '이메일은 필수입니다';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다';
      }

      if (!formData.bio) {
        newErrors.bio = '자기소개는 필수입니다';
      } else if (formData.bio.length < 10) {
        newErrors.bio = '자기소개는 최소 10글자 이상이어야 합니다';
      } else if (formData.bio.length > 200) {
        newErrors.bio = '자기소개는 최대 200글자까지 가능합니다';
      }

      if (!formData.country) {
        newErrors.country = '국가를 선택해주세요';
      }

      if (!formData.gender) {
        newErrors.gender = '성별은 필수입니다';
      }

      if (formData.experience < 0 || formData.experience > 50) {
        newErrors.experience = '경력은 0년 이상 50년 이하여야 합니다';
      }

      if (!formData.files || formData.files.length === 0) {
        newErrors.files = '최소 1개의 파일을 업로드해주세요';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        pushToast({
          status: 'error',
          title: '유효성 검사 실패',
          description: '입력 값을 확인해주세요',
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // API 호출 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 랜덤 에러 시뮬레이션 (30% 확률)
        if (Math.random() < 0.3) {
          throw new Error('서버 오류가 발생했습니다');
        }

        // 성공 - 콘솔에 제출 데이터 표시
        console.group('✅ Form 제출 성공 (Regular)');
        console.log('📋 제출된 데이터:', formData);
        console.log('👤 이름:', formData.name);
        console.log('📧 이메일:', formData.email);
        console.log('📝 자기소개:', formData.bio);
        console.log('🌍 국가:', formData.country?.label);
        console.log('👫 성별:', formData.gender);
        console.log('💼 경력:', `${formData.experience}년`);
        console.log(
          '📎 파일:',
          formData.files ? `${formData.files.length}개` : '없음'
        );
        console.groupEnd();

        // Toast 알림
        pushToast({
          status: 'success',
          title: '제출 성공',
          description: `${formData.name}님의 정보가 성공적으로 제출되었습니다. 콘솔을 확인하세요.`,
        });

        // 폼 초기화
        setFormData({
          name: '',
          email: '',
          bio: '',
          country: null,
          gender: '',
          experience: 0,
          files: null,
        });
        setErrors({});
      } catch (error) {
        // 에러 처리 - 콘솔에 에러 표시
        console.group('❌ Form 제출 실패 (Regular)');
        console.error('에러:', error);
        console.log('제출 시도한 데이터:', formData);
        console.groupEnd();

        pushToast({
          status: 'error',
          title: '제출 실패',
          description:
            error instanceof Error
              ? error.message
              : '알 수 없는 오류가 발생했습니다',
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <Box maxW="600px" w="100%" p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          일반 Form 예제
        </Text>

        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            {/* Name Input */}
            <Field.Root required invalid={!!errors.name}>
              <FormLabel>
                이름 <Field.RequiredIndicator />
              </FormLabel>
              <Input
                name="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                trimWhiteSpace
              />
              <Field.ErrorText>{errors.name}</Field.ErrorText>
            </Field.Root>

            {/* Email Input */}
            <Field.Root required invalid={!!errors.email}>
              <FormLabel>
                이메일 <Field.RequiredIndicator />
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                noSpaces
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>

            {/* Bio Textarea */}
            <Field.Root required invalid={!!errors.bio}>
              <FormLabel>
                자기소개 <Field.RequiredIndicator />
              </FormLabel>
              <Textarea
                name="bio"
                placeholder="자기소개를 입력하세요 (10-200자)"
                value={formData.bio}
                onChange={(e) => {
                  setFormData({ ...formData, bio: e.target.value });
                  if (errors.bio) setErrors({ ...errors, bio: undefined });
                }}
                rows={4}
              />
              <Field.HelperText>{formData.bio.length}/200자</Field.HelperText>
              <Field.ErrorText>{errors.bio}</Field.ErrorText>
            </Field.Root>

            {/* Country Select */}
            <Field.Root required invalid={!!errors.country}>
              <FormLabel>
                국가 <Field.RequiredIndicator />
              </FormLabel>
              <Select
                name="country"
                options={countryOptions}
                value={formData.country}
                onChange={(value) => {
                  setFormData({ ...formData, country: value });
                  if (errors.country)
                    setErrors({ ...errors, country: undefined });
                }}
                placeholder="국가를 선택하세요"
                invalid={!!errors.country}
              />
              <Field.ErrorText>{errors.country}</Field.ErrorText>
            </Field.Root>

            {/* Gender Radio */}
            <Field.Root required invalid={!!errors.gender}>
              <FormLabel>
                성별 <Field.RequiredIndicator />
              </FormLabel>
              <RadioGroup
                value={formData.gender}
                onValueChange={(details) => {
                  setFormData({ ...formData, gender: details.value });
                  if (errors.gender)
                    setErrors({ ...errors, gender: undefined });
                }}
              >
                <Flex gap={4}>
                  <Radio value="male">남성</Radio>
                  <Radio value="female">여성</Radio>
                  <Radio value="other">기타</Radio>
                </Flex>
              </RadioGroup>
              <Field.ErrorText>{errors.gender}</Field.ErrorText>
            </Field.Root>

            {/* Experience Slider */}
            <Field.Root required invalid={!!errors.experience}>
              <FormLabel>
                경력 (년) <Field.RequiredIndicator />
              </FormLabel>
              <Flex w="100%" gap={4} align="center">
                <Slider
                  w="100%"
                  value={[formData.experience]}
                  onValueChange={(details) => {
                    setFormData({ ...formData, experience: details.value[0] });
                    if (errors.experience)
                      setErrors({ ...errors, experience: undefined });
                  }}
                  min={0}
                  max={50}
                  step={1}
                >
                  <SliderControl>
                    <SliderTrack h="1">
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb index={0} />
                  </SliderControl>
                </Slider>
                <Text fontWeight="bold" minW="60px" textAlign="right">
                  {formData.experience}년
                </Text>
              </Flex>
              <Field.ErrorText>{errors.experience}</Field.ErrorText>
            </Field.Root>

            {/* File Input */}
            <Field.Root required invalid={!!errors.files}>
              <FormLabel>
                파일 업로드 <Field.RequiredIndicator />
              </FormLabel>
              <FileInput
                onChange={(files) => {
                  setFormData({ ...formData, files });
                  if (errors.files) setErrors({ ...errors, files: undefined });
                }}
                multiple
                accept="image/*,.pdf"
              />
              <Field.HelperText>
                이미지 또는 PDF 파일만 업로드 가능합니다
              </Field.HelperText>
              {formData.files && formData.files.length > 0 && (
                <Text fontSize="sm" color="gray.600" mt={2}>
                  {formData.files.length}개 파일 선택됨
                </Text>
              )}
              <Field.ErrorText>{errors.files}</Field.ErrorText>
            </Field.Root>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="solid"
              w="100%"
              mt={4}
              disabled={isSubmitting}
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </Button>
          </Stack>
        </form>
      </Box>
    );
  },
};
