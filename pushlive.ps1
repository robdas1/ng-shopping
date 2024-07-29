param (
	[Parameter(Position = 0, Mandatory = $true)]
	[string]$commitMessage
)

# Build the project
ng build --output-path "docs" --base-href "/ng-shopping/"

# Move files from docs/browser to docs
Move-Item -Path ".\docs\browser\*" -Destination ".\docs" -Force

# Remove the browser directory
Remove-Item -Path ".\docs\browser" -Recurse -Force

# Add changes to git
git add .

# Commit changes with the provided commit message
git commit -m $commitMessage

# Push changes to the remote repository
git push