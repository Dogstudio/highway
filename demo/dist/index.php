<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
    <title>Highway - Demo</title>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article class="site-content" data-router-view="home">
            <h1>Highway</h1>
            <h3>TL;DR</h3>
            <p><strong>Highway</strong> is a <em>lightweight (<strong>2.2ko</strong> gzipped)</em>, <em>robust</em>, <em>modern</em> and <em>flexible</em> library that will let you create AJAX navigations with beautiful transitions on your websites. It's been a while we were trying to build this kind of library to fits our needs at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a> and that hopefully will fit yours now we're releasing it!</p>
            
            <hr>

            <h2>What is Highway ?</h2>
            <p>The concept of <strong>Highway</strong> is to provide a simple solution to create and manage <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started" target="_blank">AJAX</a> navigation between pages of a website with beautiful transitions of your own.</p>

            <h2>Why Highway ?</h2>
            <p>We looked for a <em>modern</em>, <em>simple</em>, <em>flexible</em> and <em>lightweight</em> transitions manager to use on our projects at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a> but the problem was that all these goals couldn’t be achieved with existing libraries of this kind.</p>
            <p>Few weeks ago we then decided to take our time to create <strong>Highway</strong> and make it open source hoping it could help you as much as it helps us in our daily routine.</p>
            
            <hr>

            <h2>The goals</h2>
            <h3>Simple</h3>
            <p><strong>Highway</strong> needed to be quite simple to setup so we decided to do most of the work in background and provide classes to developers they could extend in order to enrich them with their custom code.</p>

            <h3>Flexible</h3>
            <p><strong>Highway</strong> needed to stay flexible to let you take all scenarios into account. As we said in the previous goal, we are providing classes to developers they can extend and enrich with their custom code.</p>

            <h3>Modern</h3>
            <p>When developing <strong>Highway</strong> we had to choose between either making it fully compatible with major browsers including IE11 or taking advantage of ES2015+ features and let you manage older browsers support with polyfills.</p>
            <p>We’ve finally chosen the second option because it let us develop a lightweight library that doesn’t weight more than <strong>2.2ko</strong> when minified and gzipped.</p>
            <p>Also we believe that we shouldn’t live in past and if these features are available it’s to use them even if they are not fully supported. Like lot of other agencies we have to lead the developer ecosystem to this modernity even if we still need to use polyfills for older browsers support.</p>
            <p>But since we are really kind at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a>, we took care of the ES5 version as well to let you choose between a lighter and modern ES2015+ version of Highway or the ES5 one that is heavier but that supports our old friend, IE11.</p>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
