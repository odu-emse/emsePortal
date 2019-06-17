<?php
session_start();

require_once '../build/components/header.php';
require_once '../build/components/globals.php';

?>
<script>
$(function() {
    $("#skill_input").autocomplete({
        source: "search.php",
        minLength: 1,
        select: function( event, ui ) {
            console.log("test");
            event.preventDefault();
            $("#skill_input").val(ui.item.id);
        }
    });
});
</script>

<div class="auto-widget">
    <p>Your Skills: <input type="text" id="skill_input"/></p>
</div>

<?php
require_once '../build/components/footer.php'
?>