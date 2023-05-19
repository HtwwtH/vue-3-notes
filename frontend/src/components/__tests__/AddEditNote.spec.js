import { describe, it, expect, vi } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import AddEditNote from '../Notes/AddEditNote.vue'

describe('AddEditNote', () => {
  it('renders the component with default props', () => {
    const wrapper = shallowMount(AddEditNote, {
      props: {
        modelValue: '',
      },
    });

    // Assert component renders correctly
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('card');
    expect(wrapper.classes()).toContain('has-background-success-dark');
    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.find('textarea').element.value).toBe('');
    expect(wrapper.find('textarea').element.placeholder).toBe('Type your note...');
    expect(wrapper.find('.is-danger').exists()).toBe(false);
    expect(wrapper.find('.field.is-grouped').exists()).toBe(true);
  });

  it('renders the component with custom props', () => {
    const wrapper = shallowMount(AddEditNote, {
      props: {
        modelValue: 'Test note',
        bgColor: 'info',
        placeholder: 'Enter your note here',
        label: 'Note Label',
        isDanger: true,
      },
    });

    // Assert component renders correctly with custom props
    expect(wrapper.classes()).toContain('has-background-info-dark');
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Note Label');
    expect(wrapper.find('textarea').element.value).toBe('Test note');
    expect(wrapper.find('textarea').element.placeholder).toBe('Enter your note here');
    expect(wrapper.find('.is-danger').exists()).toBe(true);
    expect(wrapper.find('.field.is-grouped').exists()).toBe(true);
  });

  it('emits update:modelValue event on textarea input', async () => {
    const wrapper = shallowMount(AddEditNote, {
      props: {
        modelValue: 'Test note',
      },
    });

    const textarea = wrapper.find('textarea');
    await textarea.setValue('Updated note');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Updated note']);
  });

  it('calls focus() method on textareaRef', () => {
    const wrapper = shallowMount(AddEditNote, {
      props: {
        modelValue: '',
      },
    });

    const focusMock = vi.fn();
    wrapper.vm.textareaRef = {
      focus: focusMock,
    };

    wrapper.vm.focusTextArea();
    expect(focusMock).toHaveBeenCalled();
  });
})
