
import Werneo from "./core/werneo.js";
import WerneoAjaxLoader from "./plugins/ajaxLoader.js";
import WerneoBreadcrumbs from "./plugins/breadcrumbs.js";
import WerneoDropdowns from "./plugins/dropdowns.js";
import WerneoDynaFilter from "./plugins/dynaFilter.js";
import WerneoFlashMessages from "./plugins/flashMessages.js";
import WerneoGallery from "./plugins/gallery.js";
import WerneoLists from "./plugins/lists.js";
import WerneoModalButtons from "./plugins/modalButtons.js";
import WerneoModals from "./plugins/modals.js";
import WerneoNavigation from "./plugins/navigation.js";
import WerneoTabs from "./plugins/tabs.js";
import WerneoTimeline from "./plugins/timeline.js";
import WerneoTreeView from "./plugins/treeView.js";

window.werneo = new Werneo();

/// register plugins
window.werneo.registerPlugin('ajaxLoader',new WerneoAjaxLoader());
window.werneo.registerPlugin('breadcrumbs',new WerneoBreadcrumbs());
window.werneo.registerPlugin('dropdowns',new WerneoDropdowns());
window.werneo.registerPlugin('dynaFilter',new WerneoDynaFilter());
window.werneo.registerPlugin('flashMessages',new WerneoFlashMessages());
window.werneo.registerPlugin('gallery',new WerneoGallery());
window.werneo.registerPlugin('lists',new WerneoLists());
window.werneo.registerPlugin('modalButtons',new WerneoModalButtons());
window.werneo.registerPlugin('modals',new WerneoModals());
window.werneo.registerPlugin('navigation',new WerneoNavigation());
window.werneo.registerPlugin('tabs',new WerneoTabs());
window.werneo.registerPlugin('timeline',new WerneoTimeline());
window.werneo.registerPlugin('treeView',new WerneoTreeView());

window.werneo.invoke();
