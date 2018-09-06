<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article class="site-content" data-router-view="get-started">
            <h1>Get started</h1>
            <p>Now we have followed the <a href="./installation.php">installation</a> process of <strong>Highway</strong> it's time to use all the magic in it !</p>

            <h2 id="structure">Structure</h2>
            <p>In order to work properly, <strong>Highway</strong> needs a basic HTML structure.</p>
            <p>All we have to do is to put somewhere in our views the <strong>data-router-wrapper</strong> that will contain and only contain the <strong>data-router-view</strong> that will be updated by <strong>Highway</strong> on navigation. Everything outside of the <strong>data-router-wrapper</strong> will stay the same all along the user's navigation.</p>
            <p>This is the look of this HTML structure itself:</p>
            <?php include('./snippets/structure.php'); ?>

            <h2 id="renderers">Renderers</h2>
            <p>A renderer is a script for each view that contains all the Javascript we need for each one of them. It can be shared by multiple views if we want. A default renderer called <strong>Highway.Renderer</strong> can be extended to create our custom ones and it'll be used by default if a given view has no custom renderer attached to it.</p>
            <p>A renderer comes with some built-in methods to let us call our scripts at different key moment during the navigation process. These built-in methods are:</p>
            
            <ul>
                <li><strong>onEnter</strong>: This method is called when the <strong>data-router-view</strong> is added to the DOM.</li>
                <li><strong>onLeave</strong>: This method is called when the transition to hide the <strong>data-router-view</strong> starts.</li>
                <li><strong>onEnterCompleted</strong>: This method is called when the transition to show the <strong>data-router-view</strong> is over.</li>
                <li><strong>onLeaveCompleted</strong>: This method is called when the <strong>data-router-view</strong> is removed from the DOM.</li>
            </ul>

            <p>In our custom renderer we also have access to some useful variables:</p>

            <ul>
                <li><strong>this.page</strong>: The full DOM of the view the renderer is attached to.</li>
                <li><strong>this.root</strong>: The <strong>[data-router-view]</strong> of the view the renderer is attached to.</li>
            </ul>

            <p>Long story short, let see what a custom renderer look like:</p>
            <?php include('./snippets/renderer.php'); ?>

            <h2 id="transitions">Transitions</h2>
            <p>OK so we know more about renderers but we are sad because there are no transitions between our views... Let now see how to create them!</p>
            <p>Transitions in <strong>Highway</strong> are pretty simple. A default transition called <strong>Highway.Transition</strong> can be extended to create our custom ones. Once we've extended the <strong>Highway.Transition</strong> we have access to those essential methods:</p>

            <ul>
                <li><strong>in</strong>: The method that should contain the transition to show a <strong>data-router-view</strong>.</li>
                <li><strong>out</strong>: The method that should contain the transition to hide a <strong>data-router-view</strong>.</li>
            </ul>

            <p>Each of those methods get two parameters we can name the way we want.<br> Here are some good defaults:</p>
            
            <ul>
                <li><strong>view</strong>: The <strong>data-router-view</strong> to show or hide.</li>
                <li><strong>done</strong>: The required callback method <strong>we have to call</strong> once each of the transitions is over.</li>
            </ul>

            <p>Let now see what a custom transition looks like:</p>
            <?php include('./snippets/transition.php'); ?>
            
            <h2 id="core">Core</h2>
            <p>We should now have our custom renderers and transitions, it's time to attach everything to the right views and to <strong>Highway</strong>. To do so we have to call <strong>Highway.Core</strong> where we can attach everything we created.</p>
            <p>Remember the <strong>data-router-view</strong> we added to our view? We named it and its name will now be used to attach it to our custom renderer and transition.</p>
            <p>This is a reminder of our HTML structure so far:</p>
            <?php include('./snippets/structure.php'); ?>

            <p>Now let's call <strong>Highway.Core</strong> and do some magic:</p>
            <?php include('./snippets/core.php'); ?>

            <p>Now we attached our custom renderer and transition to our view, all scripts contained in the custom renderer will be called everytime the view is displayed and the transition will be called everytime we leave or access the view.</p>
            <p>We might want to use the same transition for all the views across our website. This is possible by adding a <strong>default</strong> key to our transitions list in the <strong>Highway.Core</strong> options. When we do so, for each view, <strong>Highway</strong> will look for a transition attached to our <strong>data-router-view</strong> name and fallback to the default one if none is found.</p>
            <?php include('./snippets/core-default.php'); ?>

            <p>That's it ! We now have <strong>Highway</strong> setup and ready to work. We can repeat those steps for each view of our website and we'll have beautiful transitions between them.</p>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
