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
            <p><strong>Highway</strong> is a <em>lightweight (<strong>2.2ko</strong> gzipped)</em>, <em>robust</em>, <em>modern</em> and <em>flexible</em> library that will let us create AJAX navigations with beautiful transitions on our websites. It's been a while we were trying to build this kind of library to fits our needs at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a> and we now finally released it!</p>
            
            <hr>

            <h2>What is Highway ?</h2>
            <p>The concept of <strong>Highway</strong> is to provide a simple solution to create and manage <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started" target="_blank">AJAX</a> navigation between pages of our website with beautiful transitions of our own.</p>

            <h2>Why Highway ?</h2>
            <p>We looked for a <em>modern</em>, <em>simple</em>, <em>flexible</em> and <em>lightweight</em> transitions manager to use on our projects at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a> but the problem was that all these goals couldn’t be achieved with existing libraries of this kind.</p>
            <p>We then decided to take our time to create <strong>Highway</strong> and make it open source hoping it could help others as much as it helps us in our daily routine.</p>
            
            <hr>

            <h2>The goals</h2>
            <h3>Simple</h3>
            <p><strong>Highway</strong> needed to be quite simple to setup so we decided to do most of the work in background and provide classes that can be extended and enriched with custom code.</p>

            <h3>Flexible</h3>
            <p><strong>Highway</strong> needed to stay flexible to let us take all scenarios into account. As we said in the previous goal, we are providing classes that can be extended and enriched with custom code.</p>

            <h3>Modern</h3>
            <p>When developing <strong>Highway</strong> we had to choose between either making it fully compatible with major browsers including IE11 or taking advantage of ES2015+ features to get a lighter library but with less browser support.</p>
            <p>At first we chose to develop it in ES2015+ only to get a library that doesn't weight more than <strong>2.2ko</strong> when minified and gzipped. Also we trully believe we have to lead the developer ecosystem with other agencies to the future.</p>
            <p>But then since we are really kind at <a href="https://www.dogstudio.co" target="_blank">Dogstudio</a>, we took more time to provide an ES5 version as well. This way we have the choice between a lighter version of <strong>Highway</strong> with less but still very good browser support or the ES5 one that is a bit heavier but that supports our old friend, IE11.</p>
        
            <p>Now we get to know more about <strong>Highway</strong> it's time for us to <a href="./installation.php">install it</a>.</p>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
