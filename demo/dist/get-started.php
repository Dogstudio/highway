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
            <p>Now you have followed the <a href="./installation.php">installation</a> process of <strong>Highway</strong> it's time to use all the magic in it !</p>

            <h2 id="renderers">Renderers</h2>
            <p>
                A renderer is a script for each view that contains all the Javascript you need for each one of them. It can be shared by multiple views if you want.
                A default renderer called <strong>Highway.Renderer</strong> can be extended to create your custom ones and it'll be used by default if a given view has no custom renderer attached to it.
            </p>
            <p>A renderer comes with some built-in methods to let you call your script at different key moment during the navigation process. These built-in methods are:</p>
            
            <ul>
                <li><strong>onEnter</strong>: This method is called when the view DOM is added to the document.</li>
                <li><strong>onLeave</strong>: This method is called when the transition to hide the view starts.</li>
                <li><strong>onEnterCompleted</strong>: This method is called when the transition to show the view is over.</li>
                <li><strong>onLeaveCompleted</strong>: This method is called when the view DOM is removes from the document</li>
            </ul>

            <p>In your custom renderer you can also have access to some useful variables:</p>

            <ul>
                <li><strong>this.page</strong>: The full DOM of the page the renderer is attached to.</li>
                <li><strong>this.view</strong>: The <strong>[data-router-view]</strong> of the page the renderer is attached to.</li>
            </ul>

            <p>Long story short, let see what a custom renderer look like:</p>
            <?php include('./snippets/renderer.php'); ?>

            <h2 id="transitions">Transitions</h2>
            <p>OK so you know more about renderers but you are sad because there are no transitions between your pages... Don't be afraid, let's now see how to create them!</p>
            <p>Transitions in <strong>Highway</strong> are pretty simple. A default transition called <strong>Highway.Transition</strong> can be extended to create your custom ones. We baked everything you need to easily create transitions in this one. Once you've extended the <strong>Highway.Transition</strong> you have acces to those essential methods:</p>

            <ul>
                <li><strong>in</strong>: The method that should contain the transition to show a view.</li>
                <li><strong>out</strong>: The method that should contain the transition to hide a view.</li>
            </ul>

            <p>Each of those methods can get two parameters in this order you can name the way you want be here are some good defaults:</p>
            
            <ul>
                <li><strong>view</strong>: The view to show or hide.</li>
                <li><strong>done</strong>: The required callback method <strong>you have to call</strong> once each of the transitions is over.</li>
            </ul>

            <p>Let now see what a custom transition looks like:</p>
            <?php include('./snippets/transition.php'); ?>

            <h2>HTML Structure</h2>
            <p>In order to work properly, <strong>Highway</strong> needs a basic HTML structure.</p>
            <p>All you have to do is to put somewhere in your views the <strong>data-router-wrapper</strong> that will contain and only contain the <strong>data-router-view</strong> that will be updated by <strong>Highway</strong> on navigation. Everything outside of the <strong>data-router-wrapper</strong> will stay the same all along the user's navigation.</p>
            
            <h2>Core</h2>
            <p>You should now have your custom renderers and transitions, it's time to attach everything to the right views and to <strong>Highway</strong>. To do so you have access to the <strong>Highway.Core</strong> you have to call and where you can attach everything you created.</p>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
