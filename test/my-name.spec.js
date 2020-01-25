import { mount } from '@vue/test-utils';
import MyName from '../src/components/my-name.vue';

const wrapper = mount(MyName);

describe('MyName test', () => {
  it('Displays my name when I write it', () => {
    expect(wrapper.vm.$data.name).toBe('My name');

    const input = wrapper.find('input');
    input.element.value = 'Stefan';
    input.trigger('input');

    expect(wrapper.vm.$data.name).toBe('Stefan');
  });
});
