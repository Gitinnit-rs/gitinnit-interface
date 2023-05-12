import {render,screen} from "@testing-library/vue";
import { describe , it , expect,beforeEach } from 'vitest';
import {mount} from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'
import Create from '../pages/Create.vue';
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Explore from '../pages/Explore.vue'
import Settings from '../pages/Settings.vue'
import Auth_Callback from '../pages/Auth_Callback.vue'
import Project from '../pages/project/_id.vue'
import ProjectCard from '../components/ProjectCard.vue'
import AddModal from '../components/AddModal.vue'
import Sidebar from '../components/Sidebar.vue'
import CollabModal from '../components/CollabModal.vue'
import Collaborators from '../components/Collaborators.vue'
import Timeline from '../components/Timeline.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import TimelineComboboxVue from "../components/TimelineCombobox.vue";

describe('Snapshot',()=>{
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() caull without having to pass it to it:
        // `useStore(pinia)`
        setActivePinia(createPinia())
      })

    //Test 1 :- Captures snapshot of the pages --- add for other pages as well
    it("1.Renders create page",()=>{
        const wrapper = render(Create,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("2.Renders home page",()=>{
        const wrapper = render(Home,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("3.Renders about page",()=>{
        const wrapper = render(About,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("4.Renders explore page",()=>{
        const wrapper = render(Explore,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("5.Renders settings page",()=>{
        const wrapper = render(Settings,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("6.Renders Auths_Callback page",()=>{
        const wrapper = render(Auth_Callback,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })


    it("7.Renders  add-modal component",()=>{
        const wrapper = render(AddModal,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("8.Renders sidebar component",()=>{
        const wrapper = render(Sidebar,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })
 
    it("9.Renders project-card page",()=>{
        const wrapper = render(ProjectCard,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("10.Renders COllab module",()=>{
        const wrapper = render(CollabModal,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("11.Renders Collaborator module",()=>{
        const wrapper = render(Collaborators,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("12.Renders Timeline module",()=>{
        const wrapper = render(Timeline,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("13.Renders Audio Player module",()=>{
        const wrapper = render(AudioPlayer,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("14.Renders Project",()=>{
        const wrapper = render(Project,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })

    it("15.Render TimelineComboboxVue",()=>{
        const wrapper = render(TimelineComboboxVue,{props:{element:"div"}})
        expect(wrapper).toMatchSnapshot();
    })
})

