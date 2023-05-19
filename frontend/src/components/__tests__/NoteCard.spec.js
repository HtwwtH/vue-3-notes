import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import NoteCard from '../Notes/NoteCard.vue'
import DeleteNoteModal from '../Notes/DeleteNoteModal.vue'

describe('AddEditNote', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NoteCard, {
      props: {
        note: {
          id: 'note-1',
          content: 'Test note',
          date: '2023-05-19',
        },
      },
      global: {
        stubs: ['RouterLink'],
      }
    });
  });

  it('renders the note content and details', () => {
    expect(wrapper.find('.content').text()).toContain('Test note');
    expect(wrapper.find('[data-testId="dateFormatted"]').text()).toContain('2023-05-19');
    expect(wrapper.find('[data-testId="symbolsAmount"]').text()).toContain('9 symbols');
  });

  it('renders Edit button with correct RouterLink', () => {
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);

    const routerLinkElement = routerLink.element
    expect(routerLinkElement.getAttribute('to')).toBe('/edit-note/note-1');
  });

  it('renders Delete button that triggers deleteNote modal', async () => {
    const deleteButton = wrapper.find('[data-testId="deleteBtn"]');
    await deleteButton.trigger('click.prevent');

    const deleteNoteModal = wrapper.findComponent(DeleteNoteModal);

    expect(deleteNoteModal.exists()).toBe(true);
    expect(deleteNoteModal.props().noteId).toBe('note-1');
    expect(deleteNoteModal.props().modelValue).toBe(true);
  });

  it('renders DeleteNoteModal component when modals.deleteNote is true', async () => {
    wrapper.vm.modals.deleteNote = true;
    await wrapper.vm.$nextTick();

    const deleteNoteModal = wrapper.findComponent(DeleteNoteModal);

    expect(deleteNoteModal.exists()).toBe(true);
    expect(deleteNoteModal.props().noteId).toBe('note-1');
    expect(deleteNoteModal.props().modelValue).toBe(true);
  });
})