import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { onClickOutside } from '@vueuse/core'
import { setActivePinia, createPinia } from 'pinia'
import { useNotesStore } from '@/stores/notes'

import { shallowMount } from '@vue/test-utils'
import DeleteNoteModal from '../Notes/DeleteNoteModal.vue'

vi.mock("http", () => {
  return {
    default: {
      delete: vi.fn(),
    },
  };
});

vi.mock('@vueuse/core', () => ({
  onClickOutside: vi.fn(),
}));

describe('DeleteNoteModal', () => {
  let wrapper;
  let notesStore;

  beforeEach(() => {
    setActivePinia(createPinia())

    notesStore = useNotesStore()

    wrapper = shallowMount(DeleteNoteModal, {
      props: {
        modelValue: true,
        noteId: 'note-1',
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    wrapper.unmount()
  });

  it('renders the modal with correct content', () => {
    expect(wrapper.classes()).toContain('is-active');
    expect(wrapper.find('.modal-card-title').text()).toBe('Delete Note?');
    expect(wrapper.find('.modal-card-body').text()).toBe('Are you sure you want to delete this Note?');
    expect(wrapper.find('.modal-card-foot').findAll('button').length).toBe(2);
  });

  it('closes the modal when close button is clicked', async () => {
    await wrapper.find('.delete').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
  });

  it('closes the modal when cancel button is clicked', async () => {
    await wrapper.find('.button').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
  });

  it('calls deleteNote method', async () => {
    const spy = vi.spyOn(notesStore, 'deleteNote')
    await wrapper.find('.button.is-success').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('closes the modal when clicked outside the modal', () => {
    const onClickOutsideHandler = onClickOutside.mock.calls[0][1];
    onClickOutsideHandler();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
  });
})