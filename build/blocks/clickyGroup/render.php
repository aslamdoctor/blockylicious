<?php
use WebDevEducation\Blockylicious;

$block_gap = Blockylicious::convert_custom_properties($attributes['style']['spacing']['blockGap'] ?? 0);
$block_wrapper_attributes = get_block_wrapper_attributes([
	'style' => 'gap: ' . $block_gap .'; justify-content: ' . $attributes['justifyContent'] . ';',
]);
?>
<div <?php echo $block_wrapper_attributes;?>>
	<?php echo $content;?>
</div>
