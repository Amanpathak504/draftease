/**
* Template Name: Arsha - v4.6.0
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
/*Chat box start*/
// Normal Brain: Designing a cool lil chat widget in CSS with some time between projects.
// Big Brain: Make a functional jQuery form submit and simulate a response.
// Galactic Brain: Do it in React.
// Multiversal Brain: Make a React Native chat app.

// Version: Big Brain, but with a headache.
// Headache: Needed to include babel polyfill to work with Promises.
$(function () {

  // Define some elements from the DOM and utility methods.
  let $form = $("#msgForm"),
  $newMsg = $form.find("input"),
  $sendBtn = $form.find("button"),
  $feed = $("#msgs"),
  _wait = ms => new Promise((r, j) => setTimeout(r, ms)), // See [0]
  _secs = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  // Define our send method.
  var _send = data => {
    // Send data to a new .msg
    let $msg = $('<div class="msg"></div>'),
    { sender, typing } = data;
    if (sender !== "me") {
      $msg.addClass("to");
    } else {
      $msg.addClass("from");
    }
    $msg.text(data.msg);
    if (typing) $msg.addClass("typing");
    $msg.appendTo($feed);
    // If sending was successful, clear the text field.
    $newMsg.val("");
    // And simulate a reply from our agent.
    if (sender === "me") setTimeout(_agentReply, 1000);
    if (typing) return $msg; // ref to new DOM .msg
  };



  var _agentReply = () => {
    // After a few seconds, the agent starts to type a message.
    let waitAfew = _wait(_secs(3000, 5000)),
    showAgentTyping = async () => {
      console.log("agent is typing...");
      // Let the user know the agent is typing
      let $agentMsg = _send({ msg: "Agent is typing...", typing: true, sender: false });
      // and in a few seconds show the typed message.
      waitAfew.then(() => {
        // @TODO: Simulate actual typing by removing the typing message when the agent isn't typing, and before the agent sends the typed message. Also allow typing to continue a number of times with breaks in between.
        $agentMsg.text("Lorem ipsum dolor sit amet.");
        $agentMsg.removeClass("typing");
      });

    };
    waitAfew.then(showAgentTyping());
  };

  // Define event handlers: Hitting Enter or Send should send the form.
  $newMsg.on("keypress", function (e) {
    // @TODO: Allow [mod] + [enter] to expand field & insert a <BR>
    if (e.which === 13) {
      // Stop the prop
      e.stopPropagation();e.preventDefault();
      // Wrap the msg and send!
      let theEnvelope = {
        msg: $newMsg.val(),
        sender: "me" };

      return _send(theEnvelope);
    } else {
      // goggles
    }
  });
  $sendBtn.on("click", function (e) {
    // Stop the prop
    e.stopPropagation();e.preventDefault();
    // Wrap the msg and send!
    let theEnvelope = {
      msg: $newMsg.val(),
      sender: "me" };

    return _send(theEnvelope);
  });
});

/**
 * Roadmap / TODO / Bugs to be fixed
 *
 * 1) add max-height and overflow scrolling.
 * 2) add debounce/throttle to agent reply, so that when the user sends a new message before the agent has replied it wont create a new agent reply process. [big brain version only]
 *
 */

/**
 * Credits
 *
 * [0] wait() method from: https://hackernoon.com/lets-make-a-javascript-wait-function-fa3a2eb88f11
 *
 */