#!/usr/bin/env -S bash -e

SOURCE_DIR=/tmp/deploy/dashboard/dist
DESTDIR=/usr/local/shida/dashboard/
CURRENT_LINK=${DESTDIR}current
MAX_PAST_RELEASES=5
TIMESTAMP=$(date +%Y%m%d%H%M%S)
RELEASE_DIR="${DESTDIR}releases/${TIMESTAMP}"

mkdir -p "$RELEASE_DIR"
cp -r "${SOURCE_DIR}/." "${RELEASE_DIR}"

echo "Linking new release to $CURRENT_LINK"
if [[ -L "$CURRENT_LINK" ]]; then
    rm "$CURRENT_LINK"
fi
ln -s "$RELEASE_DIR" "$CURRENT_LINK"

# Remove old releases, leaving only the most recent
echo "Removing past releases"
find ${DESTDIR}releases/ -maxdepth 1 -mindepth 1 -type d | sort -n | head -n -$MAX_PAST_RELEASES | xargs rm -rf
